import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const MySwal = withReactContent(Swal);
const Navbar = () => {

    const {logout} = useLogout();
    const {user} = useAuthContext();


    const handleLogout = async () => {
        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: 'Do you want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            logout();
            MySwal.fire(
                'Logged out!',
                'You have been logged out.',
                'success'
            );
        }
    };

    return (    
        <header>
            <div className="container">
                <Link to="/">
                    <h1>To-Doom</h1>
                </Link>
                <nav>
                    {user &&(
                    <div>
                        <span>{user.email}</span>
                        <button className="logoutBtn" onClick={handleLogout}>Logout</button>
                    </div>
                    )}   
                    {!user &&(
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                     )}
                </nav>
            </div>
        </header>     
    )
}

export default Navbar;  
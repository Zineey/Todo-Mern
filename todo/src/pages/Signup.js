import { useState } from 'react';
import { useSignupContext } from '../hooks/useSignupContext';


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const {signup, error, loading} = useSignupContext();    


    const handleSignup = async (e) => {
        e.preventDefault();
        
        await signup(email, password, firstName, lastName);
    }


    return (
        <form className="signup" onSubmit={handleSignup}>
            <h3>Sign up</h3>
            {error && <div className="error">{error}</div>}
            <label>Email:</label>
            <input
            type = "email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            >
            </input>

            <label>Password:</label>
            <input
            type = "password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            >
            </input>

            <label>First Name:</label>
            <input 
            type = "text"
            onChange = {(e) => setFirstName(e.target.value)}
            value={firstName}
            ></input>

            <label>Last Name:</label>
            <input 
            type="text"
            onChange = {(e)=> setLastName(e.target.value)}
            value={lastName}
            ></input>
            
            <button className='submit' disabled={loading}>Signup</button>
        </form>
    )

}

export default Signup;
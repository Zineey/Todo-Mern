import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, loading} = useLogin();

    const handleLogin = async (e) => {
        e.preventDefault();

        await login(email, password);

    }

    return (
        <form className="login" onSubmit={handleLogin}>
            <h3>Login</h3>
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

            <button className='submit' disabled={loading}>Login</button>

        </form>
    )

}

export default Login;
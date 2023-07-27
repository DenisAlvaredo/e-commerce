import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import "./styles.css"

function Login() {

    const { accessToken, refreshToken, login, logout } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async (event) => {
        event.preventDefault();

        const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const { access_token, refresh_token } = data;
            localStorage.setItem('accessToken', access_token);
            localStorage.setItem('refreshToken', refresh_token);
            login({ access_token, refresh_token });
        } else {
            console.log('Error de inicio de sesión');
        }

    };


    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
    
        login({ access_token: storedAccessToken, refresh_token: storedRefreshToken });
        }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    
        logout();
    };

    return (
        <div>
            {!accessToken ? (
                <div className="formcard" >
                    <h2>Log in</h2>
                    <form onSubmit={handleLogin}>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Contraseña:
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Iniciar sesión</button>
                    </form>
                    <p><Link to={"/register"}>Register</Link></p>
                </div>
            ) : (
                <>
                    <p>¡Has iniciado sesión con éxito!</p>
                    <p>Access Token: {accessToken}</p>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </>
            )}
        </div>
    );
}

export default Login;

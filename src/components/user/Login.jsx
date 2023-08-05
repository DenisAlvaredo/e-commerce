import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useMutation, useQueryClient } from 'react-query';
import "./styles.css"

function Login() {
    const { accessToken, refreshToken, login, logout } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const queryClient = useQueryClient();

    const loginMutation = useMutation(
        (credentials) => {
            return fetch('https://api.escuelajs.co/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            }).then(response => response.json());
        },
        {
            onSuccess: (data) => {
                const { access_token, refresh_token } = data;
                localStorage.setItem('accessToken', access_token);
                localStorage.setItem('refreshToken', refresh_token);
                login({ access_token, refresh_token });

                queryClient.invalidateQueries('user');
            },
        }
    );

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await loginMutation.mutateAsync({ email, password });
        } catch (error) {
            console.log('Error de inicio de sesión', error);
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
        <div className="user">
            {!accessToken ? (
                <div className="user-div" >
                    <h2>Log in</h2>
                    <form onSubmit={handleLogin} className="user-form">
                        <label className="user-label">
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label className="user-label">
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <button className="user-button" type="submit" disabled={loginMutation.isLoading}>
                            {loginMutation.isLoading ? 'Logging in...' : 'Log in'}
                        </button>
                    </form>
                    <p>Don't have and account? <Link to={"/register"}>Register</Link></p>
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

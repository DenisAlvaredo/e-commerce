import { useState } from 'react';
import "./styles.css"

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();

        const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            password,
            avatar,
        }),
        });

        if (response.ok) {
        console.log('Usuario creado exitosamente');
        } else {
        console.log('Error al crear el usuario');
        }
    };

    return (
        <div className='formcard'>
        <h2>Registro de usuario</h2>
        <form onSubmit={handleRegister}>
            <label>
            Nombre:
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            </label>
            <label>
            Email:
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </label>
            <label>
            Contraseña:
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </label>
            <label>
            Avatar (URL):
            <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
            />
            </label>
            <button type="submit" className='regbutton'>Registrarse</button>
        </form>
        </div>
    );
}

export default Register;

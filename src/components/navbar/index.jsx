import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../user/AuthContext';
import './styles.css'

function NavBar() {
    const { accessToken, logout } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        logout();
    };
    return (
        <nav>
            <div>
                <ul>
                    <li>Logo.png</li>
                    <li className='pull-right'> <Link to={"/cart-detail"} className='link'> Cart </Link></li>
                    <li > <Link to={"/"} className='link'>Categories </Link></li>
                    <li> <Link to={"/products"} className='link'> Products </Link></li>
                    {accessToken ? ( 
                        <>
                            <li> <Link to={"/"} className='link'> Profile </Link> </li> 
                            <li> <button onClick={handleLogout}>Log out</button> </li>
                        </>
                    ) : ( <li> <Link to={"/login"} className='link'> Login</Link></li> )}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../user/AuthContext';
import './styles.css'

function NavBar() {
    const { accessToken } = useContext(AuthContext);

    return (
        <nav>
            <div>
                <ul>
                    <li>Logo.png</li>
                    <li className='pull-right'>Cart</li>
                    <li > <Link to={"/"} className='link'>Categories </Link></li>
                    <li> <Link to={"/products"} className='link'> Products </Link></li>
                    {accessToken ? ( <li> <Link to={"/"} className='link'> Profile </Link> </li> 
                    ) : ( <li> <Link to={"/login"} className='link'> Login</Link></li> )}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;

<<<<<<< HEAD
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../user/AuthContext';
=======
import React from "react";
import { Link } from "react-router-dom";
>>>>>>> 2d4f62bfda9e00f8058e70c3202c15a3a003ce7a
import './styles.css'

function NavBar() {
    const { accessToken } = useContext(AuthContext);

    return (
        <nav>
            <div>
                <ul>
                    <li>Logo.png</li>
                    <li className='pull-right'>Cart</li>
<<<<<<< HEAD
                    <li > <Link to={"/"} className='link'>Categories </Link></li>
                    <li> <Link to={"/products"} className='link'> Products </Link></li>
                    {accessToken ? ( <li> <Link to={"/"} className='link'> Profile </Link> </li> 
                    ) : ( <li> <Link to={"/login"} className='link'> Login</Link></li> )}
=======
                    <li> <Link to={"/"}>Categories </Link> </li>
                    <li> <Link to={"/products"}> Products </Link> </li>
                    <li>Register</li>
>>>>>>> 2d4f62bfda9e00f8058e70c3202c15a3a003ce7a
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;

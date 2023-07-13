import React from "react";
import { Link } from "react-router-dom";
import './styles.css'

function NavBar() {
    return (
        <nav>
            <div>
                <ul>
                    <li>Logo.png</li>
                    <li className='pull-right'>Cart</li>
                    <li> <Link to={"/"}>Categories </Link> </li>
                    <li> <Link to={"/products"}> Products </Link> </li>
                    <li>Register</li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;

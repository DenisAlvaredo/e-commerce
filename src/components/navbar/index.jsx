import './styles.css'

function NavBar() {
    return (
        <nav>
            <div>
                <ul>
                    <li>Logo.png</li>
                    <li className='pull-right'>Cart</li>
                    <li> <a href="/">Categories </a> </li>
                    <li> <a href="/products"> Products </a> </li>
                    <li>Register</li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;
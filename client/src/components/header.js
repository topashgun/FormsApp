import React from 'react'
import Logo from '../logo.png'
function Header() {
    return (
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">
                <img src={Logo} alt="" loading="lazy" width="50" className="img-fluid"></img>
            </a>
            <p>Hello User</p>
        </nav>
    )
}

export default Header;
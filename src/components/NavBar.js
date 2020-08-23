import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg  justify-content-between navbar-dark bg-dark fixed-top" >
                <a className="navbar text-white " href="/">
                    {/* <img src={logo} width="35" height="35" alt="logo" /> */}
                    SF Living Wage Coalition
                </a>

                <ul className="navbar-nav " >
                    <li className="nav-item"><Link className="nav-link " to="/"></Link></li>
                    <Link to="/" className="btn btn-outline-danger ">Menu</Link>
                    <button type="button" className="btn btn-danger btn-sm">Log out</button>
                </ul>


            </nav>
        </div>
    )
}

export default NavBar;
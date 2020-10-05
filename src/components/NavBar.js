import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { toast } from 'react-toastify';


const NavBar = (props) => {

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('jwt')
        props.setAuth(false)
        toast.success('Logged out Successfully!')
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg  justify-content-between navbar-dark bg-dark fixed-top" >
                <a className="navbar text-white " href="/">
                    {/* <img src={logo} width="35" height="35" alt="logo" /> */}
                    SF Living Wage Coalition
                </a>

                <ul className="navbar-nav " >
                    <li className="nav-item"><Link className="nav-link " to="/">{` 🧑🏻‍💻 ${props.name}`}</Link></li>
                    <Link to="/menu" className="btn btn-outline-danger ">Menu</Link>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={e => logout(e)}
                    >Log out</button>
                </ul>


            </nav>
        </div>
    )
}

export default NavBar;
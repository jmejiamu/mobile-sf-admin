import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { toast } from 'react-toastify';


const NavBar = (props) => {

    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('jwt')
        props.setAuth(false)
        props.setIfRegister(false)
        toast.success(' ✔️ Logged out Successfully!')
    }


    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg  justify-content-between navbar-dark bg-dark fixed-top" >
                <a className="navbar text-white ml-sm-4" href="/">
                    {/* <img src={logo} width="35" height="35" alt="logo" /> */}
                    SF Living Wage Coalition
                </a>

                <ul className="navbar-nav " >
                    <li className="nav-item"><Link className="nav-link text-white mr-sm-5" to="/">{` 💻 ${props.name}`}</Link></li>
                    <Link to="/menu" className="btn btn-outline-danger mr-sm-4 ">Menu</Link>
                    <button
                        type="button"
                        className="btn btn-danger btn-sm mr-sm-5"
                        onClick={e => logout(e)}
                    >Log out</button>
                </ul>


            </nav>
        </div>
    )
}

export default NavBar;
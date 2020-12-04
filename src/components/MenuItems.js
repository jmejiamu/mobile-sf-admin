import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

const MenuItems = (props) => {
    console.log(props);
    const [name, setName] = useState("");

    const getName = async () => {
        try {
            const response = await fetch('http://157.245.184.202:8080/dashboard', {
                method: 'GET',
                headers: { token: localStorage.jwt }
            });
            const data = await response.json()

            setName(data.name)

        } catch (error) {
            console.error(error.message);
        }
    }


    // const logout = (e) => {
    //     e.preventDefault()
    //     localStorage.removeItem('jwt');
    //     props.setAuth(false)
    //     toast.success("Logged out successfully!")
    // }
    useEffect(() => {
        getName();
    }, [])



    return (
        <>
            <NavBar setAuth={props.setAuth} name={name} />
            <h1 className="dashboard">Dashboard </h1>
            {/* <h2 className="text-white" >Welcome {` 🧑🏻‍💻 ${name}`}</h2> */}
            {/* <button className="btn btn-primary"
                onClick={e => logout(e)}
            >LOGOUT</button> */}
            <div className="row  justify-content-between">


                <div className="card mb-5" >
                    {/* <img class="card-img-top" src="..." alt="Card image cap"> */}
                    <div className="card-body" style={{ width: '400px' }} >
                        <h5 className="card-title">Events</h5>
                        <p className="card-text ">Add, delete, or edit an event</p>
                        <Link to="/events" className="btn btn-danger">Go to events</Link>
                    </div>
                </div>

                <div className="card mb-5" >
                    {/* <img class="card-img-top" src="..." alt="Card image cap"> */}
                    <div className="card-body" style={{ width: '400px' }}>
                        <h5 className="card-title">Assistance </h5>
                        <p className="card-text">Description coming...</p>
                        <Link to="/assistance" className="btn btn-danger">Go to complaints</Link>
                    </div>
                </div>

                <div className="card mb-5" >
                    {/* <img class="card-img-top" src="..." alt="Card image cap"> */}
                    <div className="card-body" style={{ width: '400px' }}>
                        <h5 className="card-title">Art</h5>
                        <p className="card-text">Update art information</p>
                        <Link to="/arts" className="btn btn-danger">Go to events</Link>

                    </div>
                </div>

                <div className="card mb-5 " >
                    {/* <img class="card-img-top" src="..." alt="Card image cap"> */}
                    <div className="card-body" style={{ width: '400px' }}>
                        <h5 className="card-title">Bids</h5>
                        <p className="card-text">Art auction winners</p>
                        <Link to="#" className="btn btn-danger">Go to all bids</Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MenuItems;
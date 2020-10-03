import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MenuItems = (props) => {
    console.log(props);
    const [name, setName] = useState("");

    const getName = async () => {
        try {
            const response = await fetch('http://localhost:3001/dashboard', {
                method: 'GET',
                headers: { token: localStorage.jwt }
            });
            const data = await response.json()

            setName(data.name)

        } catch (error) {
            console.error(error.message);
        }
    }


    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('jwt');
        props.setAuth(false)
        toast.success("Logged out successfully!")
    }
    useEffect(() => {
        getName();
    }, [])



    return (
        <>
            <h1 className="dashboard">Dashboard </h1>
            <h2 className="text-white" >Welcome {name}</h2>
            <button className="btn btn-primary"
                onClick={e => logout(e)}
            >LOGOUT</button>
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
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Link to="#" className="btn btn-danger">Go to events</Link>
                    </div>
                </div>

                <div className="card mb-5 " >
                    {/* <img class="card-img-top" src="..." alt="Card image cap"> */}
                    <div className="card-body" style={{ width: '400px' }}>
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Link to="#" className="btn btn-danger">Go to events</Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default MenuItems;
import React from 'react';
import { Link } from 'react-router-dom';

const MenuItems = () => {
    return (
        <>
            <h1 className="dashboard">Dashboard </h1>
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
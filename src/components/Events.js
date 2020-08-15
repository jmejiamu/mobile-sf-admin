import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Events = () => {
    const [eventData, setEventsData] = useState([]);
    const getEvents = async () => {
        try {
            const response = await fetch('http://157.245.184.202:8080/calendar')
            const jsonData = await response.json()

            setEventsData(jsonData);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getEvents();
    }, [])
    return (
        <div>
            This is an event page
            {
                eventData.map(event => {
                    return (
                        <>

                            <div className="card mb-5" >

                                <div className="card-body text-left" >
                                    <h5 className="card-title">{event.description}</h5>
                                    <p className="card-text ">{event.notes}</p>
                                    <p><strong>Location:</strong> {event.location}</p>
                                    <p><strong>From: </strong> {event.duration}</p>
                                    <p><strong>Start Date:</strong> {event.start_date}</p>
                                    <p> <strong>End Date:</strong> {event.end_date}</p>
                                    <Link to="/events" className="btn btn-secondary">Edit</Link>
                                </div>
                            </div>

                        </>
                    )
                })
            }
            <Link to="/" className="btn btn-secondary">Menu</Link>
        </div>
    )
}

export default Events;
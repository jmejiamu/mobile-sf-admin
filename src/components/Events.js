import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditEvent from './EditEvents';

const Events = (props) => {
    const [eventData, setEventsData] = useState([]);

    const deleteEvents = async (id) => {
        try {
            const deleteData = await fetch(`http://157.245.184.202:8080/deleteEvent/${id}`, {
                method: 'DELETE'
            })
            setEventsData(eventData.filter(event => event.id !== id))
        } catch (error) {
            console.error(error.message);
        }
    }

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
            <h1>Events</h1> 
            <button
                type="button"
                className="btn btn btn-danger mb-4  mt-5 d-flex justify-content-end"
            >Add event</button>
            {eventData.length === 0 ? <h1 className="text-center mt-5 mb-5">There is not events yet!{'😌'}</h1> : (
                eventData.map(event => {
                    return (

                        <div className="card mb-5" key={event.id} >

                            <div className="card-body text-left" >
                                <h5 className="card-title">{event.description}</h5>
                                <p className="card-text ">{event.notes}</p>
                                <p><strong>Location:</strong> {event.location}</p>
                                <p><strong>From: </strong> {event.duration}</p>
                                <p><strong>Start Date:</strong> {event.start_date}</p>
                                <p> <strong>End Date:</strong> {event.end_date}</p>
                                <div className=" card-link btn-group">
                                    <EditEvent event={event} props={props} />
                                </div>
                                <button
                                    type="button"
                                    className="card-link btn btn btn-danger"
                                    onClick={() => deleteEvents(event.id)}>Delete</button>
                            </div>
                        </div>

                    )
                })
            )}
            <Link to="/" className="btn btn-secondary">Menu</Link>
        </div>
    )
}

export default Events;
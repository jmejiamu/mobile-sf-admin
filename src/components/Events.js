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
                            <h4>{event.description}</h4>
                            <p>Description: {event.notes}</p>
                            <p>Location{event.location}</p>
                            <p>Start Date: {event.start_date}</p>

                        </>
                    )
                })
            }
            <Link to="/" className="btn btn-secondary">Menu</Link>
        </div>
    )
}

export default Events;
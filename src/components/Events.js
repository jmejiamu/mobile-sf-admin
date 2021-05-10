import React, { useEffect, useState } from 'react';

import EditEvent from './EditEvents';
import AddEvents from './AddEvents';
import NavBar from './NavBar';
import { toast } from 'react-toastify';

const Events = (props) => {
    console.log('Events-props', props);
    const [eventData, setEventsData] = useState([]);
    const [name, setName] = useState("");

    const deleteEvents = async (id) => {
        try {
            const deleteData = await fetch(`http://157.245.184.202:8080/deleteEvent/${id}`, {
                method: 'DELETE'
            })
            const data = await deleteData.json();
            setEventsData(eventData.filter(event => event.id !== id))
            toast.success(data.data)
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

    useEffect(() => {
        getEvents();
        getName();
    }, [])
    return (
        <div class="container">
            <NavBar setAuth={props.setAuth} name={name} />
            <h1 className="events-section">Events</h1>
            
            <div className="row" >
              <div className="col-sm"> <AddEvents /></div>
            </div>
           
            {eventData.length === 0 ? <h1 className="text-center mt-5 mb-5 text-white">There is not events yet!{'😌'}</h1> : (
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

        </div>
    )
}

export default Events;
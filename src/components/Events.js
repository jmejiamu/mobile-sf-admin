import React, { useEffect, useState } from 'react';

import EditEvent from './EditEvents';
import AddEvents from './AddEvents';
import NavBar from './NavBar';
import { toast } from 'react-toastify';
import Endpoint from '../shared/Endpoint/Endpoint';
import Axios from 'axios';
import InsertContentToLog from '../shared/InsertContentToLog/InsertContentToLog';

const baseUrl = Endpoint.url;

const Events = (props) => {
    console.log('Events-props', props);
    const [eventData, setEventsData] = useState([]);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");

    console.log("username event,", username);

    const deleteEvents = async (id) => {
        try {
            const deleteData = await fetch(`${baseUrl}/deleteEvent/${id}`, {
                method: 'DELETE'
            })
            const data = await deleteData.json();
            setEventsData(eventData.filter(event => event.id !== id))
            InsertContentToLog.addLog(username, "Delete Event", "Event").then((data) => {
                console.log("data,", data);
            })
            toast.success(data.data)
        } catch (error) {
            console.error(error.message);
        }
    }

    const getEvents = async () => {
        try {
            const response = await fetch(`${baseUrl}/calendar`)
            const jsonData = await response.json()

            setEventsData(jsonData);
        } catch (error) {
            console.error(error);
        }
    };


    const getName = async () => {
        try {
            const response = await fetch(`${baseUrl}/dashboard`, {
                method: 'GET',
                headers: { token: localStorage.jwt }
            });
            const data = await response.json()

            setName(data.name)

        } catch (error) {
            console.error(error.message);
        }
    }

    const getUserName = async () => {
        try{
            console.log(`${baseUrl}/getusername/`);
            const username = await Axios.get(`${baseUrl}/getusername`, {headers: {'token': localStorage.jwt}});
            console.log("username,",username);
            setUsername(username.data.email);
        }catch(err){
            console.log("err,", err);
        }

    }

    useEffect(() => {
        getEvents();
        getName();
        getUserName();
    }, [])
    return (
        <div>
            <NavBar setAuth={props.setAuth} name={name} />
            <h1 className="events-section">Events</h1>

            <AddEvents username={username}/>
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
                                    <EditEvent event={event} props={props} username={username}/>
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
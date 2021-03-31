import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import { toast } from 'react-toastify';

import endpoint from '../endpoint/Endpoint';

const endpointUrl = endpoint.url;


const Assistance = (props) => {
    const [assistanceData, setAssistanceData] = useState([]);
    const [name, setName] = useState("");

    const deleteAssistance = async (id) => {
        try {
            const deleteData = await fetch(`${endpointUrl}/deleteassistance/${id}`, {
                method: 'DELETE'
            })
            const data = await deleteData.json();
            setAssistanceData(assistanceData.filter(assistanceToDelete => assistanceToDelete.id !== id))
            toast.success(data.data)
        } catch (error) {
            console.error(error.message);
        }
    }

    const getData = async () => {

        try {
            const response = await fetch(`${endpointUrl}/assistancedata`)
            const jsonData = await response.json();

            setAssistanceData(jsonData);

        } catch (error) {
            console.error(error);
        };

    };

    const getName = async () => {
        try {
            const response = await fetch(`${endpointUrl}/dashboard`, {
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
        getData();
        getName();
    }, [])
    return (
        <div>
            <NavBar setAuth={props.setAuth} name={name} />
            <h1 className="events-section">Assistance Screen</h1>
            {assistanceData === 0 ? <h1 className="text-center mt-5 mb-5 text-white">There is not events yet!{'😌'}</h1> : (
                assistanceData.map((assistance) => {
                    return (
                        <div className="card mb-5" key={assistance.id}>
                            <div className="card-body text-left">
                                <h5 className="card-title" ><strong>Name:</strong> {assistance.full_name}</h5>
                                <p className="card-text" > <strong>Notes:</strong>  {assistance.notes}</p>
                                <h5 className="card-title" > Contact Information</h5>
                                <p className="card-text" ><strong>Phone:</strong> {assistance.phone}</p>
                                <p className="card-text" ><strong>Email:</strong> {assistance.email}</p>
                                <button
                                    type="button"
                                    className="card-link btn btn btn-danger"
                                    onClick={() => deleteAssistance(assistance.id)}
                                >Delete</button>

                            </div>

                        </div>
                    )
                })
            )}
        </div>
    )
}

export default Assistance;
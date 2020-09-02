import React, { useState, useEffect } from 'react';




const Assistance = () => {
    const [assistanceData, setAssistanceData] = useState([]);

    const deleteAssistance = async (id) => {
        try {
            const deleteData = await fetch(`http://157.245.184.202:8080/deleteAssistance/${id}`, {
                method: 'DELETE'
            })
            setAssistanceData(assistanceData.filter(assistanceToDelete => assistanceToDelete.id !== id))
        } catch (error) {
            console.error(error.message);
        }
    }

    const getData = async () => {

        try {
            const response = await fetch('http://157.245.184.202:8080/assistancedata')
            const jsonData = await response.json();

            setAssistanceData(jsonData);

        } catch (error) {
            console.error(error);
        };

    };

    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
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
                                >DELETE</button>

                            </div>

                        </div>
                    )
                })
            )}
        </div>
    )
}

export default Assistance;
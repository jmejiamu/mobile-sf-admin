import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import Endpoint from '../shared/Endpoint/Endpoint';
import Axios from 'axios';

const baseUrl = Endpoint.url;

const Log = (props) => {
    const [name, setName] = useState("");
    const [logEvents, setLogEvents] = useState([]);

    console.log("logEvents, ",logEvents);
    
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

    const getLogEvents = async () => {
      try{
        console.log("logs");
        const logEvents = await Axios.get(`${baseUrl}/getAllLog`, {headers: {'token': localStorage.jwt}});
        console.log("logEvents in get,",logEvents.data);
        setLogEvents(logEvents.data.allLogs);
      
    }catch(error){
          console.error(error.message);
      }



    }

    useEffect(() =>{
        getName();
        getLogEvents();
    }, []);
    
    return (
        <div>
        <NavBar setAuth={props.setAuth} name={name} />
        <h1 className="text-white">Log </h1>
        <div class="container">
            {logEvents.length === 0 ? <h1 className="text-center mt-5 mb-5 text-white">There is not Log events yet {'😌'} </h1> : (
                logEvents.map(logEvent => {
                    return (
                      
                        <div className="card mb-5  col-sm" key={logEvent.id}>
                            <div className="card-body text-left" >
                                <h5 className="card-title" ><strong>Username: </strong>{logEvent.username}</h5>
                                <p><strong>Log Event: </strong>{logEvent.event}</p>
                                <p><strong>Create Date: </strong>{logEvent.createDate}</p>
                                <p><strong>Category: </strong>{logEvent.Category}</p>
                            </div>
                           
                        </div>
                    )
                })
            )}
            </div>
    </div>
)
}

export default Log;
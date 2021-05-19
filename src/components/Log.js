import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import Endpoint from '../shared/Endpoint/Endpoint';
import Axios from 'axios';
import Pagination from './Pagination';

const baseUrl = Endpoint.url;

const Log = (props) => {
    const [name, setName] = useState("");
    const [logEvents, setLogEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [numCategory, setNumCategory] = useState([]);
    
    const itemPerPage = 4; 
    const lastIndex = itemPerPage * currentPage;
    const firstIndex = lastIndex - itemPerPage;
    const currentLogEvents = logEvents.slice(firstIndex, lastIndex);

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
        const logEvents = await Axios.get(`${baseUrl}/getAllLog`, {headers: {'token': localStorage.jwt}});
        console.log("logEvents in get,",logEvents.data);
        setLogEvents(logEvents.data.allLogs);
      
    }catch(error){
          console.error(error.message);
      }
   }

   const getNumCategory = async () => {
       try{
        const numCategory = await Axios.get(`${baseUrl}/getCountCategory`, {headers: {'token': localStorage.jwt}});
        setNumCategory(numCategory.data.countCategory);
       }catch(error){
          console.error(error.message);
       }
   }


useEffect(() =>{
        getName();
        getLogEvents();
        getNumCategory();
    }, []);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
   
    
    return (
        <div>
        <NavBar setAuth={props.setAuth} name={name} />
        <h1 className="text-white">Log </h1>
        <div class="container">
            <div className="row row-cols-1 row-cols-md-2" >
                {
                    numCategory.map((item,i) => (
                    <div className="mb-1 mr-2">
                        <div className="card mb-5 col-sm bg-danger" key = {i}>
                            <div className="card-body text-center">
                                <h7 className="card-title">{item.Category}</h7>
                                <p>{item.countCategory}</p>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
        <div class="container">
            {logEvents.length === 0 ? <h1 className="text-center mt-5 mb-5 text-white">There is not Log events yet {'😌'} </h1> : (
                currentLogEvents.map(logEvent => {
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
            <Pagination artPerPage={itemPerPage} totalArt={logEvents.length} paginate={paginate} />
    </div>
)
}

export default Log;
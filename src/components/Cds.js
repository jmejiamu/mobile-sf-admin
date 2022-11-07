
import React, { useState, useEffect } from 'react'
// import AddCds from './AddCds';
// import AddDetails from './AddDetails';
import NavBar from './NavBar';
import EditCd from './EditCd';
import EditCloseBidDate from './EditCloseBidDate';
import { toast } from 'react-toastify';
import Pagination from './Pagination';
import Endpoint from '../shared/Endpoint/Endpoint';
import Axios from 'axios';
import InsertContentToLog from '../shared/InsertContentToLog/InsertContentToLog';

const baseUrl = Endpoint.url;

const Cds = (props) => {

    const [cdData, setCdData] = useState([]);
    const [name, setName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [cdPerPage, setCdPerPage] = useState(4);

    const [currentSection, setCurrentSection] = useState(1);
    const [username, setUsername] = useState("");

    console.log("username cds,", username);

    const deleteCd = async (id) => {
        try {
            console.log("delete cds!!");
            
            const deleteData = await fetch(`${baseUrl}/deletecd/${id}`, {
                method: "DELETE"
            })
            
            const data = await deleteData.json();
            console.log("data cd,", data);
            setCdData(cdData.filter(cd => cd.id !== id))
            toast.success(data.data)

            InsertContentToLog.addLog(username, "Delete CD", "CD").then((data) => {
                console.log("data,", data);
            })

        } catch (error) {
            console.error(error.message);
        }
    }

    const getCd = async () => {
        try {
            const response = await fetch(`${baseUrl}/cds`)
            const jsonData = await response.json()
            setCdData(jsonData);
        } catch (error) {
            console.error(error.message);
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
        getCd();
        getName();
        getUserName();
    }, [])

    // Get the current Cd piece
    const indexOfLastCd = currentPage * cdPerPage;
    const indexOfFirstCd = indexOfLastCd - cdPerPage;
    const currentCd = cdData.slice(indexOfFirstCd, indexOfLastCd);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <NavBar setAuth={props.setAuth} name={name} />
            <h1 className="text-white">Cd Section</h1>
            {/* <AddCds /> */}
            {/* <EditCloseBidDate /> */}
            <div class="container">  <div className="row" >
            {cdData.length === 0 ? <h1 className="text-center mt-5 mb-5 text-white">There is not Cd piece yet {'😌'} </h1> : (
                currentCd.map(cd => {
                    return (
                      
                        <div className="card mb-5  col-sm" key={cd.id}>
                            <div className="card-body text-left" >
                                <img className="card-img-top" src={cd.path} alt="user-pic" />
                                <h5 className="card-title" >{cd.title}</h5>
                                {/* <p>Image url: {Cd.path}</p> */}
                                <p><strong>Cost: </strong> {cd.details}</p>
                                <p><strong>Details: </strong>{cd.contact}</p>
                                <p><strong>User name:</strong> {cd.name}</p>
                                <p><strong>User' Bid: </strong>{cd.bid}</p>
                                <p><strong>Phone or Email:  </strong>{cd.phone_email}</p>
                                <div className=" card-link btn-group">

                                    <EditCd cd={cd} props={props} username={username} />


                                </div>
                                {/* <AddDetails cd={cd} /> */}
                                <button
                                    type="button"
                                    className="card-link btn btn btn-danger"
                                    onClick={() => deleteCd(cd.id)}
                                >Delete</button>
                            </div>
                           
                        </div>
                    )
                })
            )}
            </div> 
            </div>
            <Pagination artPerPage={cdPerPage} totalArt={cdData.length} paginate={paginate} />
            
        </div>
    )
}

export default Cds;

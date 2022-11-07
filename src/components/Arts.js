
import React, { useState, useEffect } from 'react'
import AddArts from './AddArts';
import AddDetails from './AddDetails';
import NavBar from './NavBar';
import EditArt from './EditArt';
import EditCloseBidDate from './EditCloseBidDate';
import { toast } from 'react-toastify';
import Pagination from './Pagination';
import Endpoint from '../shared/Endpoint/Endpoint';
import Axios from 'axios';
import InsertContentToLog from '../shared/InsertContentToLog/InsertContentToLog';

const baseUrl = Endpoint.url; 

const Arts = (props) => {
    const [artData, setArtData] = useState([]);
    const [cdData, setCdData] = useState([]);
    const [dvdData, setDvdData] = useState([]);
    const [picturesData, setPicturesData] = useState([]);
    const [photoData, setPhotoData] = useState([]);
    const [name, setName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [artPerPage, setArtPerPage] = useState(4);
    const [username, setUsername] = useState("");

    console.log("art name,", username);

    const [currentSection, setCurrentSection] = useState(0);

    const deleteArt = async (id) => {
        try {
            const deleteData = await fetch(`${baseUrl}/deleteart/${id}`, {
                method: "DELETE"
            })
            const data = await deleteData.json();
            setArtData(artData.filter(art => art.id !== id))
            
            InsertContentToLog.addLog(username, "Delete Art work", "Art").then((data) => {
                console.log("data,", data);
            })
            
            toast.success(data.data)

        } catch (error) {
            console.error(error.message);
        }
    }

    const getArt = async () => {
        try {
            const response = await fetch(`${baseUrl}/arts`)
            const jsonData = await response.json()
            setArtData(jsonData);
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
            console.log("data name,", name);

            setName(data.name)

        } catch (error) {
            console.error(error.message);
        }
    }

    const getUserName = async () => {
        try{
            console.log(`${baseUrl}/getusername/`);
            const username = await Axios.get(`http://localhost:3001/getusername`, {headers: {'token': localStorage.jwt}});
            console.log("username,",username);
            setUsername(username.data.email);
        }catch(err){
            console.log("err,", err);
        }

    }

    useEffect(() => {
        getArt();
        getName();
        getUserName();
    }, [])

    // Get the current Art piece
    const indexOfLastArt = currentPage * artPerPage;
    const indexOfFirstArt = indexOfLastArt - artPerPage;
    const currentArt = artData.slice(indexOfFirstArt, indexOfLastArt);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <NavBar setAuth={props.setAuth} name={name} />

            
            <div class="container">
            <h4 className="text-white">Art Section</h4>
            <div className="row" >
            <div className="col-sm">
                <Pagination artPerPage={artPerPage} totalArt={artData.length} paginate={paginate} />
            </div>
            </div>
           
            
               <div className="row" >
            {artData.length === 0 && currentSection == 0 ? <h1 className="text-center mt-5 mb-5 text-white">There is not art piece yet {'😌'} </h1> : (
                currentArt.map(art => {
                    return (
                        <div className="card mb-5 col-sm " key={art.id}>
                            <div className="card-body text-left" >
                                <img className="card-img-top" src={art.path} alt="user-pic" />
                                <h5 className="card-title" >{art.title}</h5>
                                {/* <p>Image url: {art.path}</p> */}
                                <p><strong>Cost: </strong> {art.details}</p>
                                <p><strong>Details: </strong>{art.contact}</p>
                                <p><strong>User name:</strong> {art.name}</p>
                                <p><strong>User' Bid: </strong>{art.bid}</p>
                                <p><strong>Phone or Email:  </strong>{art.phone_email}</p>
                                <div className=" card-link btn-group">

                                    <EditArt art={art} props={props} username={username}/>

                                </div>
                                <AddDetails art={art} username={username}/>

                                <button
                                    type="button"
                                    className="card-link btn btn btn-danger"
                                    onClick={() => deleteArt(art.id)}
                                >Delete</button>
                            </div>

                        </div>
                    )
                })
            )}
            </div>
           
           
            <div className="row" >
              <div className="col-sm"><AddArts /> </div>
                <div className="col-sm">  <EditCloseBidDate /></div>
            </div>
            </div>
        </div>
    )
}

export default Arts;

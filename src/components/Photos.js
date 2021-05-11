
import React, { useState, useEffect } from 'react'
// import AddPhotos from './AddPhotos';
// import AddDetails from './AddDetails';
import NavBar from './NavBar';
// import EditPhoto from './EditPhoto';
import EditCloseBidDate from './EditCloseBidDate';
import { toast } from 'react-toastify';
import Pagination from './Pagination';
import Endpoint from '../shared/Endpoint/Endpoint';
import Axios from 'axios';
import InsertContentToLog from '../shared/InsertContentToLog/InsertContentToLog';

const baseUrl = Endpoint.url;

const Photos = (props) => {

    const [photoData, setPhotoData] = useState([]);
    const [name, setName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [photoPerPage, setPhotoPerPage] = useState(4);

    const [currentSection, setCurrentSection] = useState(1);
    const [username, setUsername] = useState("");

    const deletePhoto = async (id) => {
        try {
            const deleteData = await fetch(`${baseUrl}/deletePhoto/${id}`, {
                method: "DELETE"
            })
            const data = await deleteData.json();
            setPhotoData(photoData.filter(photo => photo.id !== id))
            toast.success(data.data)
            InsertContentToLog.addLog(username, "Delete Photo", "Photo").then((data) => {
                console.log("data,", data);
            })

        } catch (error) {
            console.error(error.message);
        }
    }

    const getPhoto = async () => {
        try {
            const response = await fetch(`${baseUrl}/photos`)
            const jsonData = await response.json()
            setPhotoData(jsonData);
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
            const username = await Axios.get(`http://localhost:3001/getusername`, {headers: {'token': localStorage.jwt}});
            console.log("username,",username);
            setUsername(username.data.email);
        }catch(err){
            console.log("err,", err);
        }

    }

    useEffect(() => {
        getPhoto();
        getName();
        getUserName();
    }, [])

    // Get the current Photo piece
    const indexOfLastPhoto = currentPage * photoPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photoPerPage;
    const currentPhoto = photoData.slice(indexOfFirstPhoto, indexOfLastPhoto);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <NavBar setAuth={props.setAuth} name={name} />
            <h1 className="text-white">Photo Section</h1>
            {/* <AddPhotos /> */}
            {/* <EditCloseBidDate /> */}

            {photoData.length === 0 ? <h1 className="text-center mt-5 mb-5 text-white">There is not Photo piece yet {'😌'} </h1> : (
                currentPhoto.map(photo => {
                    return (
                        <div className="card mb-5" key={photo.id}>
                            <div className="card-body text-left" >
                                <img className="card-img-top" src={photo.path} alt="user-pic" />
                                <h5 className="card-title" >{photo.title}</h5>
                                {/* <p>Image url: {photo.path}</p> */}
                                <p><strong>Cost: </strong> {photo.details}</p>
                                <p><strong>Details: </strong>{photo.contact}</p>
                                <p><strong>User name:</strong> {photo.name}</p>
                                <p><strong>User' Bid: </strong>{photo.bid}</p>
                                <p><strong>Phone or Email:  </strong>{photo.phone_email}</p>
                                <div className=" card-link btn-group">
                                    {/* <EditPhoto photo={photo} props={props} /> */}

                                </div>
                                {/* <AddDetails photo={photo} /> */}
                                <button
                                    type="button"
                                    className="card-link btn btn btn-danger"
                                    onClick={() => deletePhoto(photo.id)}
                                >Delete</button>
                            </div>

                        </div>
                    )
                })
            )}
            <Pagination artPerPage={photoPerPage} totalArt={photoData.length} paginate={paginate} />
        </div>
    )
}

export default Photos;

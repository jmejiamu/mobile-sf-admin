
import React, { useState, useEffect } from 'react'
// import AddPicturess from './AddPicturess';
// import AddDetails from './AddDetails';
import NavBar from './NavBar';
// import EditPictures from './EditPictures';
import EditCloseBidDate from './EditCloseBidDate';
import { toast } from 'react-toastify';
import Pagination from './Pagination';
import Endpoint from '../shared/Endpoint/Endpoint';

const baseUrl = Endpoint.url;

const Picturess = (props) => {

    const [picturesData, setPicturesData] = useState([]);
    const [name, setName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [picturesPerPage, setPicturesPerPage] = useState(4);

    const [currentSection, setCurrentSection] = useState(1);

    const deletePictures = async (id) => {
        try {
            const deleteData = await fetch(`${baseUrl}/deletePictures/${id}`, {
                method: "DELETE"
            })
            const data = await deleteData.json();
            setPicturesData(picturesData.filter(pictures => pictures.id !== id))
            toast.success(data.data)

        } catch (error) {
            console.error(error.message);
        }
    }

    const getPictures = async () => {
        try {
            const response = await fetch(`${baseUrl}/pictures`)
            const jsonData = await response.json()
            setPicturesData(jsonData);
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

    useEffect(() => {
        getPictures();
        getName();
    }, [])

    // Get the current Pictures piece
    const indexOfLastPictures = currentPage * picturesPerPage;
    const indexOfFirstPictures = indexOfLastPictures - picturesPerPage;
    const currentPictures = picturesData.slice(indexOfFirstPictures, indexOfLastPictures);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <NavBar setAuth={props.setAuth} name={name} />
            <h1 className="text-white">Pictures Section</h1>
            {/* <AddPicturess /> */}
            {/* <EditCloseBidDate /> */}

            {picturesData.length === 0 ? <h1 className="text-center mt-5 mb-5 text-white">There is not Pictures piece yet {'😌'} </h1> : (
                currentPictures.map(pictures => {
                    return (
                        <div className="card mb-5" key={pictures.id}>
                            <div className="card-body text-left" >
                                <img className="card-img-top" src={pictures.path} alt="user-pic" />
                                <h5 className="card-title" >{pictures.title}</h5>
                                {/* <p>Image url: {pictures.path}</p> */}
                                <p><strong>Cost: </strong> {pictures.details}</p>
                                <p><strong>Details: </strong>{pictures.contact}</p>
                                <p><strong>User name:</strong> {pictures.name}</p>
                                <p><strong>User' Bid: </strong>{pictures.bid}</p>
                                <p><strong>Phone or Email:  </strong>{pictures.phone_email}</p>
                                <div className=" card-link btn-group">
                                    {/* <EditPictures pictures={pictures} props={props} /> */}

                                </div>
                                {/* <AddDetails pictures={pictures} /> */}
                                <button
                                    type="button"
                                    className="card-link btn btn btn-danger"
                                    onClick={() => deletePictures(pictures.id)}
                                >Delete</button>
                            </div>

                        </div>
                    )
                })
            )}
            <Pagination artPerPage={picturesPerPage} totalArt={picturesData.length} paginate={paginate} />
        </div>
    )
}

export default Picturess;

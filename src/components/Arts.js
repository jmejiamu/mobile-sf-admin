
import React, { useState, useEffect } from 'react'
import AddArts from './AddArts';
import AddDetails from './AddDetails';
import NavBar from './NavBar';
import EditArt from './EditArt';
import EditCloseBidDate from './EditCloseBidDate';
import { toast } from 'react-toastify';
import Pagination from './Pagination';
import endpoint from './endpoint/Endpoint';

const endpointUrl = endpoint.url;

const Arts = (props) => {
    const [artData, setArtData] = useState([]);
    const [name, setName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [artPerPage, setArtPerPage] = useState(4);

    const deleteArt = async (id) => {
        try {
            const deleteData = await fetch(`${endpointUrl}/deleteart/${id}`, {
                method: "DELETE"
            })
            const data = await deleteData.json();
            setArtData(artData.filter(art => art.id !== id))
            toast.success(data.data)

        } catch (error) {
            console.error(error.message);
        }
    }

    const getArt = async () => {
        try {
            const response = await fetch(`${endpointUrl}/arts`)
            const jsonData = await response.json()
            setArtData(jsonData);
        } catch (error) {
            console.error(error.message);
        }
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
        getArt();
        getName();
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
            <h1 className="text-white">Art Section</h1>
            <AddArts />
            <EditCloseBidDate />
            {artData.length === 0 ? <h1 className="text-center mt-5 mb-5 text-white">There is not art piece yet {'😌'} </h1> : (
                currentArt.map(art => {
                    return (
                        <div className="card mb-5" key={art.id}>
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
                                    <EditArt art={art} props={props} />
                                   
                                </div>
                                <AddDetails art={art} />
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
            <Pagination artPerPage={artPerPage} totalArt={artData.length} paginate={paginate} />
        </div>
    )
}

export default Arts;

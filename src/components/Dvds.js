
import React, { useState, useEffect } from 'react'
// import AddDvds from './AddDvds';
// import AddDetails from './AddDetails';
import NavBar from './NavBar';
// import EditDvd from './EditDvd';
import EditCloseBidDate from './EditCloseBidDate';
import { toast } from 'react-toastify';
import Pagination from './Pagination';
import Endpoint from '../shared/Endpoint/Endpoint';

const baseUrl = Endpoint.url;

const Dvds = (props) => {

    const [dvdData, setDvdData] = useState([]);
    const [name, setName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [dvdPerPage, setDvdPerPage] = useState(4);

    const [currentSection, setCurrentSection] = useState(1);

    const deleteDvd = async (id) => {
        try {
            const deleteData = await fetch(`${baseUrl}/deleteDvd/${id}`, {
                method: "DELETE"
            })
            const data = await deleteData.json();
            setDvdData(dvdData.filter(dvd => dvd.id !== id))
            toast.success(data.data)

        } catch (error) {
            console.error(error.message);
        }
    }

    const getDvd = async () => {
        try {
            const response = await fetch(`${baseUrl}/dvds`)
            const jsonData = await response.json()
            setDvdData(jsonData);
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
        getDvd();
        getName();
    }, [])

    // Get the current Dvd piece
    const indexOfLastDvd = currentPage * dvdPerPage;
    const indexOfFirstDvd = indexOfLastDvd - dvdPerPage;
    const currentDvd = dvdData.slice(indexOfFirstDvd, indexOfLastDvd);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <NavBar setAuth={props.setAuth} name={name} />
            <h1 className="text-white">Dvd Section</h1>
            {/* <AddDvds /> */}
            {/* <EditCloseBidDate /> */}

            {dvdData.length === 0 ? <h1 className="text-center mt-5 mb-5 text-white">There is not Dvd piece yet {'😌'} </h1> : (
                currentDvd.map(dvd => {
                    return (
                        <div className="card mb-5" key={dvd.id}>
                            <div className="card-body text-left" >
                                <img className="card-img-top" src={dvd.path} alt="user-pic" />
                                <h5 className="card-title" >{dvd.title}</h5>
                                {/* <p>Image url: {dvd.path}</p> */}
                                <p><strong>Cost: </strong> {dvd.details}</p>
                                <p><strong>Details: </strong>{dvd.contact}</p>
                                <p><strong>User name:</strong> {dvd.name}</p>
                                <p><strong>User' Bid: </strong>{dvd.bid}</p>
                                <p><strong>Phone or Email:  </strong>{dvd.phone_email}</p>
                                <div className=" card-link btn-group">
                                    {/* <EditDvd dvd={dvd} props={props} /> */}

                                </div>
                                {/* <AddDetails dvd={dvd} /> */}
                                <button
                                    type="button"
                                    className="card-link btn btn btn-danger"
                                    onClick={() => deleteDvd(dvd.id)}
                                >Delete</button>
                            </div>

                        </div>
                    )
                })
            )}
            <Pagination dvdPerPage={dvdPerPage} totalDvd={dvdData.length} paginate={paginate} />
        </div>
    )
}

export default Dvds;


import React, { useState, useEffect } from 'react'
// import AddCds from './AddCds';
// import AddDetails from './AddDetails';
import NavBar from './NavBar';
import EditCd from './EditCd';
import EditCloseBidDate from './EditCloseBidDate';
import { toast } from 'react-toastify';
import Pagination from './Pagination';

const Cds = (props) => {

    const [cdData, setCdData] = useState([]);
    const [name, setName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [cdPerPage, setCdPerPage] = useState(4);

    const [currentSection, setCurrentSection] = useState(1);

    const deleteCd = async (id) => {
        try {
            const deleteData = await fetch(`http://157.245.184.202:8080/deletecd/${id}`, {
                method: "DELETE"
            })
            const data = await deleteData.json();
            setCdData(cdData.filter(cd => cd.id !== id))
            toast.success(data.data)

        } catch (error) {
            console.error(error.message);
        }
    }

    const getCd = async () => {
        try {
            const response = await fetch('http://157.245.184.202:8080/cds')
            const jsonData = await response.json()
            setCdData(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };
    const getName = async () => {
        try {
            const response = await fetch('http://157.245.184.202:8080/dashboard', {
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
        getCd();
        getName();
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
                                    {/* <EditCd cd={cd} props={props} /> */}

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

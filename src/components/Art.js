
import React, { useState, useEffect } from 'react'
import AddArts from './AddArts';

const Art = (props) => {
    const [artData, setArtData] = useState([]);

    const getArt = async () => {
        try { 
            const response = await fetch('http://157.245.184.202:8080/arts')
            const jsonData = await response.json()
            setArtData(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getArt();
    })

    return (
        <div>
            <h1 className="text-white">Art Section</h1>
            <AddArts />
            {artData.length === 0 ? <h1 className="text-center mt-5 mb-5 text-white">There is not art piece yet {'😌'} </h1> : (
                artData.map(art => {
                    return (
                        <div className="card mb-5" key={art.id}>
                            <div className="card-body text-left" >
                                <img className="card-img-top" src={art.path} alt="image" />
                                <h5 className="card-title" >{art.title}</h5>
                                {/* <p>Image url: {art.path}</p> */}
                                <p><strong>Cost: </strong> {art.details}</p>
                                <p><strong>Details: </strong>{art.contact}</p>
                                <p><strong>User name:</strong> {art.name}</p>
                                <p><strong>User' Bid: </strong>{art.bid}</p>
                                <p><strong>Phone or Email:  </strong>{art.phone_email}</p>
                            </div>

                        </div>
                    )
                })
            )}
        </div>
    )
}

export default Art;


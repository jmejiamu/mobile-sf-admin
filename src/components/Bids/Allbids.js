import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';

const Allbids = () => {
    const [bidData, setBidData] = useState([])
    const getBids = async () => {
        try {
            const response = await fetch('http://157.245.184.202:8080/bids')
            const jsonData = await response.json()
            setBidData(jsonData)
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getBids();
    }, [])
    return (
        <div>
            <NavBar />
            <h1 style={{ marginTop: 60 }} className="text-white">Bids</h1>
            {bidData && bidData.map(bid => {
                return (
                    <div>
                        <p className="text-white">
                            {`Title: ${bid.title} 
                            User Name: ${bid.name}
                            Contact Info: ${bid.phone_email}
                            Bid: ${bid.bid}`}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default Allbids;
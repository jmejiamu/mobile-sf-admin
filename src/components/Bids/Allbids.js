import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import SearchBox from '../search-box/SearchBox';

const Allbids = (props) => {
    const [bidData, setBidData] = useState([])
    const [searchField, setSearchField] = useState('');
    const [name, setName] = useState('');


    const getBids = async () => {
        try {
            const response = await fetch('http://157.245.184.202:8080/bids')
            const jsonData = await response.json()
            setBidData(jsonData)
        } catch (error) {
            console.error(error.message);
        }
    }

    const getName = async () => {
        try {
            const response = await fetch('http://157.245.184.202:8080/dashboard', {
                method: 'GET',
                headers: { token: localStorage.jwt }
            });
            const data = await response.json();
            setName(data.name);

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getBids();
        getName();
    }, [])

    const handleChange = (e) => {
        setSearchField(e.target.value)
    }

    const filterBids = bidData.filter(nameUserBid =>
        nameUserBid.title.toLowerCase().includes(searchField.toLowerCase())
    )
    return (
        <div>
            <NavBar setAuth={props.setAuth} name={name} />
            <h1 style={{ marginTop: 60 }} className="text-white">Bids</h1>

            <SearchBox
                placeholder="Artits or item name"
                handleChange={handleChange}
            />

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Contact Info</th>
                        <th scope="col">Bid</th>
                    </tr>
                </thead>
                <tbody>
                    {bidData && filterBids.map(bid => {
                        return (

                            <tr>
                                <th className="text-white" scope="row">{bid.id}</th>
                                <td className="text-white">{bid.title}</td>
                                <td className="text-white" >{bid.name}</td>
                                <td className="text-white " >{bid.phone_email}</td>
                                <td className="text-white" >{`$ ${bid.bid}`}</td>
                            </tr>
                        )
                    })

                    }

                </tbody>
            </table>
        </div>
    );
};

export default Allbids;
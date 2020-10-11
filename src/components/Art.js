import React, { useEffect, useState } from 'react';

import NavBar from './NavBar';

import AddArts from './AddArts';

const Arts = (props) => {

    const [artData, setArtData] = useState([])
    const [name, setName] = useState('')

    
    const [uploadState, setUploadState] = useState('');
    

    const getArts = async () => {
    }



    return (
        <div>
            <NavBar setAuth={props.setAuth} name={name} />
            <h1 className="events-section">Arts</h1>

            <AddArts />
        </div>
    )
}
export default Arts;
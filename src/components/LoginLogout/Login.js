import React, { useState, useEffect } from 'react';


import axios from 'axios';
import MenuItems from './../MenuItems';

const Login = (props) => {
    // console.log(props);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitUserData = (e) => {

        axios.post('http://localhost:3001/signin', { email, password })
            .then(response => {
                console.log(response);
                if (response.data.id) {
                    props.history.push('/menu')
                }
            }).catch((error) => {
                alert('wrong credential')
                // console.log(response)
            })


        // window.location = '/menu'
    }


    return (
        <div>
            <h1 className="events-section">Log In</h1>
            <label className="text-white">User Name</label>
            <input
                type="text"
                placeholder="User name"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <label className="text-white">Password</label>
            <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button
                type="button"
                className="btn btn-danger btn-sm mt-5"
                onClick={submitUserData}>Log In</button>

            <button type="button" className="btn btn-danger btn-sm mt-5">Register</button>

        </div>
    )
}

export default Login

import React, { useState } from 'react';
import axios from 'axios';


const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitUserData = async () => {

        // const body = {
        //     name: name,
        //     email: email,
        //     password: password
        // }
        // axios({
        //     method: 'POST',
        //     url: 'http://localhost:3001/register',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     data: body
        // })

        try {
            const body = {
                name: name,
                email: email,
                password: password
            }

            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
                body: JSON.stringify(body)
            })
            const data = await response.headers.get('jwt')
            console.log(data);
        } catch (error) {
            console.error(error);
        }



    }


    return (
        <div>
            <h1 className="events-section">Register</h1>

            <label className="text-white">User Name</label>
            <input
                type="text"
                placeholder="User name"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
            />

            <label className="text-white">Email</label>
            <input
                type="text"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <label className="text-white">Password</label>
            <input
                type="text"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button
                type="button"
                className="btn btn-danger btn-sm mt-5"
                onClick={submitUserData}
            >Register</button>
        </div>
    );
};

export default Register;
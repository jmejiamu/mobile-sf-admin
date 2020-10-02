import React, { useState, } from 'react';


import axios from 'axios';
import MenuItems from './../MenuItems';

const Login = (props) => {
    // console.log(props);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const goToRegister = () => {
        props.history.push('/register')
    }


    const submitUserData = async (e) => {

        // axios.post('http://localhost:3001/signin', { email, password })
        //     .then(response => {
        //         console.log(response.json());
        //         if (response.data.id) {
        //             props.history.push('/menu')
        //         }
        //     }).catch((error) => {
        //         alert('wrong credential')
        //         // console.log(response)
        //     })

        try {
            const body = {
                email: email,
                password: password
            }

            const response = await fetch('http://localhost:3001/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })

            const data = await response.json()
            console.log(data);
            // if (data.user.id) {
            //     props.history.push('/menu')
            // }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1 className="events-section">Log In</h1>
            <form onSubmit={submitUserData}>

                <input
                    type="text"
                    placeholder="User name"
                    className="form-control my-3"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="btn btn-danger btn-sm my-3"
                    onClick={submitUserData}
                >
                    Log In</button>

                <button
                    type="button"
                    className="btn btn-danger btn-sm my-3"
                    onClick={goToRegister}
                >Register</button>
            </form>

        </div>
    )
}

export default Login

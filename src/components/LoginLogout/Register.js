import React, { useState } from 'react';
import { toast } from 'react-toastify';


const Register = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitUserData = async (e) => {
        e.preventDefault();
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
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            const data = await response.json()
            console.log(data);
            if (data.token) {
                // document.cookie = `token=${data.token}`
                localStorage.setItem('jwt', data.token)
                props.setAuth(true)
                toast.success("Register Successfully!")
            } else {
                props.setAuth(false)
                toast.error(data)
            }
        } catch (error) {
            console.error(error.message);
        }



    }


    return (
        <div>
            <h1 className="events-section">Register</h1>
            <form onSubmit={submitUserData}>

                <input
                    type="text"
                    name="name"
                    placeholder="User name"
                    className="form-control my-3"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control my-3 "
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Password"
                    name="password"
                    className="form-control my-3 "
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="btn btn-danger btn-sm mt-5"
                    onClick={submitUserData}
                >Register</button>
            </form>
        </div>
    );
};

export default Register;
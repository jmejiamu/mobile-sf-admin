import React, { useState, } from 'react';

// import axios from 'axios';
import MenuItems from './../MenuItems';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Login = (props) => {
    // console.log(props);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    // Listener function to enter keypress. Call to check input and attempt login
    const onEnter = (event, callback) => event.key === 'Enter' && callback()

    const handleSubmit = (event) => {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    const checkUserInput = () => {
        if (password === ""){
            console.log("Enter password!") 
        } else {  console.log(password+" !") }
           
        if (email === ""){
            console.log("Please Enter Email!") 
        } else {console.log( email +" !") }
    }

    const goToRegister = () => {
        props.history.push('/register')
    }


    const submitUserData = async (e) => {
        e.preventDefault()

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
            if (data.token) {
                localStorage.setItem('jwt', data.token)
                props.setAuth(true);
                toast.success(" ✔️ Login succesfully!")
            } else {
                props.setAuth(false)
                toast.error(` ❌ ${data}`)
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="login-form" >
            <h1 className="title-sf" >SF Living Wage Coalition Admin </h1>

            <div className="card-body px-lg-5 pt-0" >

                <form onSubmit={submitUserData} 
                        onSubmit={ () => handleSubmit}
                        onKeyPress={e => onEnter(e, checkUserInput)} >

                    <h2 className="events-section">
                        Login
                    </h2>
                    <input
                        type="text"
                        placeholder="E-mail"
                        className="form-control my-3"
                        required="required"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        required="required"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        type="submit" 
                        className="btn btn-danger btn-lg my-3 btn-block"
                        // onClick={submitUserData}
                    >
                        Log In</button>

                    {/* <button
                        type="button"
                        className="btn btn-danger btn-sm my-3"
                        onClick={goToRegister}
                    >Register</button> */}
                </form>
                <p className="text-center small text-white" >
                    Dont have an account
                <Link to="/register" className="c-style"> Sign up here!</Link>
                </p>
            </div>


        </div >
    )
}

export default Login

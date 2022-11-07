import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, Redirect } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
//import {firebaseConfig} from './../../shared/FbContext';
import { getAuth, onAuthStateChanged , createUserWithEmailAndPassword, signOut} from "firebase/auth";
// const endpoint = 'http://localhost:3001';
const endpoint = 'http://157.245.184.202:8080';

const Register = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const firebaseConfig = {
        apiKey: "AIzaSyAkyeWX-kOq00zk-5luZmf6tgA__EFA8L4",
    
        authDomain: "myfirebase-a193a.firebaseapp.com",
      
        projectId: "myfirebase-a193a",
      
        storageBucket: "myfirebase-a193a.appspot.com",
      
        messagingSenderId: "717280678815",
      
        appId: "1:717280678815:web:bb93c40b8d2915bf19a3aa"
      
        
          
        };
    
    const submitUserData = async (e) => {
        e.preventDefault();
       
        try {
            const body = {
                name: name,
                email: email,
                password: password
            }
            const fb = initializeApp(firebaseConfig);
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in 
              const uemail = userCredential.user;
              //const uid = user.uid;
              setEmail(uemail);
              // ...
              toast.success("login success");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
               
                toast.error(errorMessage);
               
            }); 

            
        
            // const response = await fetch(`${endpoint}/register`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(body)
            // })

            // const data = await response.json()
            // console.log("data in resgister,", data.message);

            // if (data.message === undefined) {
            //     toast.error(data);
            // } else if (data.message.length > 0) {
            //     props.setIfRegister(true);
            //     toast.success(data.message);
            // }
            // if (data.token) {
            //     // document.cookie = `token=${data.token}`
            //     localStorage.setItem('jwt', data.token)
            //     props.setAuth(true)
            //     toast.success("Register Successfully!")
            // } else {
            //     props.setAuth(false)
            //     toast.error(data)
            // }

        } catch (error) {
            console.error(error.message);
        }



    }

    

    return (
        <div className="login-form" >
            <h1 className="events-section title-sf-register my-3">SF Living Wage Coalition Admin</h1>
            <div className="card-body px-lg-5 pt-0" >
                <form onSubmit={submitUserData}  >
                    <h2>Register</h2>
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
                        placeholder="E-mail"
                        className="form-control my-3 "
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        className="form-control my-3 "
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="btn btn-danger btn-lg my-3 btn-block"
                        onClick={submitUserData}
                    >Register</button>
                </form>
                <p className="text-center small text-white">
                    You have an account already.
                <Link to="/" className="c-style" > Singin Here!</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

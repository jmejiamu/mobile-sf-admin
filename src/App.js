import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// Components

import MenuItems from './components/MenuItems';
import Events from './components/Events';
import Assistance from './components/Assisstance/Assistance';
import Login from './components/LoginLogout/Login';
// import PageNotFound from './components/PageNotFound';
import Register from './components/LoginLogout/Register';
import Arts from './components/Arts';
import Allbids from './components/Bids/Allbids';
import Verify from './components/LoginLogout/Verify';
import Payment from './components/Payment';
import { initializeApp } from 'firebase/app';
import {firebaseConfig, MyFirebase} from './shared/FbContext';
import { getAuth, onAuthStateChanged , createUserWithEmailAndPassword} from "firebase/auth";
toast.configure()

//const endpoint = 'http://localhost:3001';
const endpoint = 'http://157.245.184.202:8080';


const App = () => {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [ifRegister, setIfRegister] = useState(false);

    const [userEmail, setUserEmail] = useState("");
    
    // this will taggle false to true  or true to false
    const setAuth = (boolean) => {
        setAuthenticated(boolean);
    }

    const isAuth = () => {
        setAuthenticated(MyFirebase);
        
        //const auth = getAuth();
        // onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //       // User is signed in, see docs for a list of available properties
        //       // https://firebase.google.com/docs/reference/js/firebase.User
        //        setUserEmail(user.email);
              
        //       setAuthenticated(true);

        //     } else {
        //       // User is signed out
        //       // ...
        //     }
        //   });
       
    }
   

    // const isAuth = async () => {
    //     try {
    //         const response = await fetch(`${endpoint}/isverify`, {
    //             method: 'GET',
    //             headers: { token: localStorage.jwt }
    //         })

    //         const data = await response.json()

    //         console.log('data in isAuth,', data);

    //         data === true ? setAuthenticated(true) : setAuthenticated(false)

    //     } catch (error) {
    //         console.error(error.message);
    //     }
    // }

    useEffect(() => {
        //const myApp = initializeApp(firebaseConfig);
        isAuth();
    }, [])


    return (
        <BrowserRouter>

            <div className="App container">

                {/* <NavBar /> */}
                <Switch>

                    {/* '/'this would be the login  */}
                    <Route exact={true}
                        path='/'
                        render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/menu" />} />
                    <Route exact path='/menu' render={props => isAuthenticated ? < MenuItems {...props} setAuth={setAuth} setIfRegister={setIfRegister} /> : <Redirect to="/" />} />
                    <Route exact path='/events' render={props => isAuthenticated ? <Events {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/register' render={props => !ifRegister ? <Register {...props} setIfRegister={setIfRegister} /> : <Redirect to="/" />} />
                    <Route exact path='/assistance' render={props => isAuthenticated ? <Assistance {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/arts' render={props => isAuthenticated ? <Arts {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/bids' render={props => isAuthenticated ? <Allbids {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/payment' render={props => isAuthenticated ? <Payment {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/comfirm/:conformationId' component={Verify} />
                </Switch>

            </div>
        </BrowserRouter>
    );
}

export default App;

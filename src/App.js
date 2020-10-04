import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import NavBar from './components/NavBar';
import MenuItems from './components/MenuItems';
import Events from './components/Events';
import Assistance from './components/Assisstance/Assistance';
import Login from './components/LoginLogout/Login';
// import PageNotFound from './components/PageNotFound';
import Register from './components/LoginLogout/Register';

toast.configure()
const App = () => {

    const [isAuthenticated, setAuthenticated] = useState(false);

    // this will taggle false to true  or true to false
    const setAuth = (boolean) => {
        setAuthenticated(boolean);
    }

    const isAuth = async () => {
        try {
            const response = await fetch('http://localhost:3001/isverify', {
                method: 'GET',
                headers: { token: localStorage.jwt }
            })

            const data = await response.json()
            console.log(data);

            data === true ? setAuthenticated(true) : setAuthenticated(false)
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        isAuth();
    }, [])

    return (
        <BrowserRouter>

            <div className="App container">

                {/* <NavBar /> */}
                <Switch>
                    {/* <Route exact={true} path='/' component={Login} />
          <Route exact path='/menu' component={MenuItems} />
          <Route exact path='/events' component={Events} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/assistance' component={Assistance} /> */}
                    {/* <Route exact path='/events/:id' component={PageNotFound} /> */}
                    {/* '/'this would be the login  */}
                    <Route exact={true}
                        path='/'
                        render={props => !isAuthenticated ? <Login {...props} setAuth={setAuth} /> : <Redirect to="/menu" />} />
                    <Route exact path='/menu' render={props => isAuthenticated ? < MenuItems {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/events' render={props => isAuthenticated ? <Events {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/register' render={props => !isAuthenticated ? <Register {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                    <Route exact path='/assistance' render={props => isAuthenticated ? <Assistance {...props} setAuth={setAuth} /> : <Redirect to="/" />} />
                </Switch>

            </div>
        </BrowserRouter>
    );
}

export default App;

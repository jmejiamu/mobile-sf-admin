import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

// Components
import NavBar from './components/NavBar';
import MenuItems from './components/MenuItems';
import Events from './components/Events';
import Assistance from './components/Assisstance/Assistance';
import Login from './components/LoginLogout/Login';
// import PageNotFound from './components/PageNotFound';
import Register from './components/LoginLogout/Register';

const App = () => {

  const [isAuthenticated, setAuthenticated] = useState(false);

  // this will taggle false to true  or true to false
  const setAuth = (boolean) => {
    setAuthenticated(boolean);
  }


  return (
    <BrowserRouter>

      <div className="App container">

        <NavBar />
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

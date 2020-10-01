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
          <Route exact={true} path='/' render={props => !isAuthenticated ? <Login {...props} /> : <Redirect to="/menu" />} />
          <Route exact path='/menu' render={props => isAuthenticated ? < MenuItems {...props} /> : <Redirect to="/" />} />
          <Route exact path='/events' render={props => isAuthenticated ? <Events {...props} /> : <Redirect to="/" />} />
          <Route exact path='/register' render={props => !isAuthenticated ? <Register {...props} /> : <Redirect to="/" />} />
          <Route exact path='/assistance' render={props => isAuthenticated ? <Assistance {...props} /> : <Redirect to="/" />} />
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;

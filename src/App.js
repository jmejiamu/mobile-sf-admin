import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

// Components
import NavBar from './components/NavBar';
import MenuItems from './components/MenuItems';
import Events from './components/Events';
// import PageNotFound from './components/PageNotFound';

const App = () => {
  return (
    <BrowserRouter>

      <div className="App container">

        <NavBar />
        <Switch>
          <Route exact path='/' component={MenuItems} />
          <Route exact path='/events' component={Events} />
          {/* <Route exact path='/events/:id' component={PageNotFound} /> */}
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import './App.css';
import Movies from './components/movies';
import NavBar from './components/navBar';
import Customers  from './components/customers';
import Rentals from './components/rentals'

import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route path="/movies/:id" component={MovieForm} />
        <Route path="/movies" component={Movies} />
        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/not-found" component={NotFound} />
        <Redirect exact from="/" to="/movies" />
        <Redirect to="/not-found" />
      </Switch>
    </React.Fragment>
  );
}

export default App;

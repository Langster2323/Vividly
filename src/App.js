import React from 'react';
import './App.css';
import Movies from './components/movies';
import NavBar from './components/navBar';
import Customers  from './components/customers';
import Rentals from './components/rentals'
import NotFound from './components/notFound';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import MovieForm from './components/movieForm';

import { Route, Switch, Redirect } from 'react-router-dom';
import MovieDetails from './components/movieDetails';


function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route path="/movies/:new" component={MovieForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/movies/:id" component={MovieDetails} />
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

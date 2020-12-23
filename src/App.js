import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {UserIsAuthenticated, UserIsNotAuthenticated} from './helpers/authHelper';
import { Provider } from 'react-redux';
import store from './store';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { rrfProps } from './store';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/layout/Dashboard';
import AddClient from './components/clients/AddClient';
import ClientDetails from './components/clients/ClientDetails';
import EditClient from './components/clients/EditClient';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
// eslint-disable-next-line no-unused-vars
import $ from 'jquery';
// eslint-disable-next-line no-unused-vars
import Popper from 'popper.js';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Settings from './components/settings/Settings';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router>
            <div className="App">
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
                  <Route exact path="/client/add" component={UserIsAuthenticated(AddClient)} />
                  <Route exact path="/client/edit/:id" component={UserIsAuthenticated(EditClient)} />
                  <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetails)} />
                  <Route exact path="/settings" component={UserIsAuthenticated(Settings)} />
                  <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
                  <Route exact path="/register" component={UserIsNotAuthenticated(Register)} />
                </Switch>
              </div>
            </div>
          </Router>
        </ReactReduxFirebaseProvider>  
      </Provider>
    )
  }
}

export default App;
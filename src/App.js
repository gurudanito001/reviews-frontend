import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/login';
import Register from './components/register';
import CreateReview from './components/createReview';
import Navbar from './components/navbar';
import Reviews from './components/reviews';
import Homepage from './components/homepage';
import PendingValidation from './components/pendingValidation';
import jwt_decode from "jwt-decode";

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      errors: {},
      currentUser: {}
    }
  }
  componentDidMount = ()=>{
    this.setCurrentUserFromLocalStorage()
  }
  setCurrentUser = (userDetails)=>{
    this.setState({ currentUser: userDetails })
  }

  setCurrentUserFromLocalStorage = ()=>{
    let token = localStorage.getItem("jwtToken");
    if(token){
      const decoded = jwt_decode(token);
      this.setState({currentUser: decoded})
      console.log(token)
    }
  }

  saveUserLocalStorage = (token)=>{
    localStorage.setItem( "jwtToken", token )
  }

  logUserOut = ()=>{
    this.setState({ currentUser: {}}, console.log(this.state))
    localStorage.clear()
  }

  setErrors = (err)=>{
    this.setState({errors: err})
  }
  displayErrors = ()=>{
    let errors = Object.values(this.state.errors);
    return errors.map(err => {
        return(
          <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{maxWidth: "300px"}}>
            <strong>{err}!</strong>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )
    });
  }

  

  render(){
    return(
        <Router>
          <Navbar 
          logUserOut={this.logUserOut}
          currentUser={this.state.currentUser}
          />
          <div className="container">
            {this.displayErrors()}
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/reviews" exact component={Reviews} />
              <Route path="/pendingValidation">
                 <PendingValidation 
                 currentUser={this.state.currentUser}/>
              </Route>
            </Switch>
          </div>
          
          <Login 
            saveUserLocalStorage={this.saveUserLocalStorage}
            setCurrentUser={this.setCurrentUser } 
            setErrors={this.setErrors}/>
          <Register 
          setErrors={this.setErrors}/>
          <CreateReview 
          currentUser={this.state.currentUser}/>
        </Router>
    )
  }
}

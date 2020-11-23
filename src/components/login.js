import React from 'react';
import { serverUrl } from '../config';
import axios from 'axios';
import jwt_decode from "jwt-decode";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    onSubmit = (e)=>{
        e.preventDefault()
        console.log(this.state)
        axios.post(`${serverUrl}/user/login`, this.state)
            .then(res => {
                if(res.data.errors){
                    this.props.setErrors(res.data.errors)
                }else{
                    const { token } = res.data;
                    this.props.saveUserLocalStorage(token)
                    const decoded = jwt_decode(token)
                    this.props.setCurrentUser(decoded);
                    console.log(decoded) 
                    document.getElementById("closeLoginModal").click()
                }
            })
    }

    onChange = (e)=>{
        this.setState({ [e.target.id]: e.target.value })
    }


    render(){
        return(

            <div className="modal fade" id="LoginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                            <button id="closeLoginModal" type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control" id="email" onChange={this.onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" onChange={this.onChange} />
                                </div>
                            </form> 
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" onClick={this.onSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
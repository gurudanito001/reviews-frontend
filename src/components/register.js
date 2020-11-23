import React from 'react';
import { serverUrl } from '../config';
import axios from 'axios';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            password2: "",
            admin: false
        }
    }

    onSubmit = (e)=>{
        e.preventDefault()
        axios.post(`${serverUrl}/user/register`, this.state)
            .then(res => {
                if(res.data.errors){
                    this.props.setErrors(res.data.errors)
                }else{
                    document.getElementById("closeRegisterModal").click()
                }
            })
    }

    

    onChange = (e)=>{
        this.setState({ [e.target.id]: e.target.value })
    }


    render(){
        return(

            <div className="modal fade" id="RegisterModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Register</h5>
                            <button id="closeRegisterModal" type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstname">Firstname</label>
                                    <input type="text" className="form-control form-control-sm" id="firstname" onChange={this.onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastname">Lastname</label>
                                    <input type="text" className="form-control form-control-sm" id="lastname" onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input type="email" className="form-control form-control-sm" id="email" onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control form-control-sm" id="password" onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password2">Confirm Password</label>
                                    <input type="password" className="form-control form-control-sm" id="password2" onChange={this.onChange} />
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
import React from 'react';
import { serverUrl } from '../config';
import axios from 'axios';

export default class CreateReview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sending: false,
            reviewText: "",
        }
    }

    onChange = (e)=>{
        this.setState({ [e.target.id]: e.target.value})
    }

    onSubmit = (e)=>{
        e.preventDefault();
        if(this.state.reviewText){
            let { reviewText } = this.state
            let review = {
                reviewText, 
                author: this.props.currentUser.firstname + " " + this.props.currentUser.lastname, 
                validated: this.props.currentUser.admin}
            console.log(review)
            this.setState({ sending: true })
            axios.post(`${serverUrl}/review/add`, review)
                .then(res => {
                    this.setState({ sending: false })
                    document.getElementById("closeReviewModal").click()
                })
        }
        
    }


    render(){
        return(

            <div className="modal fade" id="createReviewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create Review</h5>
                            <button id="closeReviewModal" type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.currentUser.firstname ? 
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="author" className="col-sm-2 col-form-label">Author</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control-plaintext" id="author"  
                                        defaultValue={"" + this.props.currentUser.firstname + " " + this.props.currentUser.lastname } />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="reviewText">Review Text</label>
                                    <textarea className="form-control" id="reviewText" maxLength="150" rows="3" onChange={this.onChange}></textarea>
                                </div>
                            </form> :
                            <h6 className="text-danger"> Please Login to create a review </h6>}
                             
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-success" disabled={this.state.sending} onClick={this.onSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
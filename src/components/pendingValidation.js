import React, { Fragment } from 'react';
import axios from 'axios';
import { serverUrl } from '../config';

export default class PendingValidation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reviews: []
        }
    }

    componentDidMount = ()=>{
        this.fetchUnvalidatedReviews()
    }

    fetchUnvalidatedReviews = ()=>{
        axios.get(`${serverUrl}/review/getUnvalidated`)
        .then(res => {
            if(res.data){
                this.setState({ reviews: res.data })
            }
        })
    }

    discardReview = (id)=>{
        axios.delete(`${serverUrl}/review/delete/${id}`)
        .then(res => {
            if(res.data){
                this.fetchUnvalidatedReviews()
            }
        })
    }

    validateReview = (id)=>{
        axios.post(`${serverUrl}/review/validate/${id}`)
        .then(res => {
            if(res.data){
                this.fetchUnvalidatedReviews()
            }
        })
    }

    reviews = ()=>{
        return this.state.reviews.map(review =>{
            return (
                <Fragment key={review._id}>
                    <div className="card" style={{minWidth: "18rem", maxWidth: "18rem"}}>
                        <div className="card-body">
                            <span className="mr-2">Author:</span><span className="card-subtitle mb-2 text-muted">{review.author}</span>
                            <label className="d-block mt-3 mb-1">Review</label> <hr className="mt-0"/>
                            <p className="card-text">{review.reviewText}</p>
                            <button className="card-link btn btn-sm btn-danger" onClick={()=>{this.discardReview(review._id)}}>Discard</button>
                            <button className="card-link btn btn-sm btn-success" onClick={()=>{this.validateReview(review._id)}}>Validate</button>
                        </div>
                    </div>
                </Fragment>
            )
        })
    }


    render(){
        return(
            <>
            <h4 className="mb-3">Pending Validation</h4>
            <div className="card-deck">
                {this.props.currentUser.admin ? this.reviews(): 
                <h6 className="text-danger"> Sorry!! Only an Admin can access this page</h6>}
            </div>
            </>
        )
    }
}
import React, { Fragment } from 'react';
import axios from 'axios';
import { serverUrl } from '../config';

export default class Reviews extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            reviews: []
        }
    }

    componentDidMount = ()=>{
        axios.get(`${serverUrl}/review/getValidated`)
            .then(res => {
                if(res.data){
                    this.setState({ reviews: res.data })
                }
            })
    }

    reviews = ()=>{
        return this.state.reviews.map(review =>{
            return (
                <Fragment key={review._id}>
                    <div className="card mb-3" style={{minWidth: "18rem", maxWidth: "18rem"}}>
                        <div className="card-body">
                            <span className="mr-2">Author:</span><span className="card-subtitle mb-2 text-muted">{review.author}</span>
                            <label className="d-block mt-3 mb-1">Review</label> <hr className="mt-0"/>
                            <p className="card-text">{review.reviewText}</p>
                        </div>
                    </div>
                </Fragment>
            )
        })
    }


    render(){
        return(
            <>
            <h4 className="mb-3">Reviews</h4>
            <div className="card-deck">
                {this.reviews()}
            </div>
            </>
        )
    }
}
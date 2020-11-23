import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = (props)=>{
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <Link to="/" className="navbar-brand font-weight-bold" href="#">Reviews Application</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to="/reviews" className="nav-link">Reviews</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/pendingValidation" className="nav-link" href="#">Pending Validation</Link>
                    </li>
                </ul>

                <button className="btn btn-sm btn-secondary mr-1 ml-auto" data-toggle="modal" data-target="#createReviewModal">Create Review</button>
                <button className="btn btn-sm btn-info mr-1" data-toggle="modal" data-target="#RegisterModal">Register</button>

                {props.currentUser.firstname ? <button className="btn btn-sm btn-danger" onClick={props.logUserOut}>Logout</button> :
                <button className="btn btn-sm btn-success" data-toggle="modal" data-target="#LoginModal">Login</button>}
                
            </div>
        </nav>
    )
}

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';

/**
  * New course card
*/
export default function NewCourse(props) {

    return (
        <Link to="/courses/create">
            <div tabIndex="0" className="card neonPurple featured">
                <div className="details">
                    <div className="details__title">
                        <i className="fa fa-plus-circle" aria-hidden="true"></i> New Course
                    </div>
                </div>
            </div>
        </Link>
    )
}
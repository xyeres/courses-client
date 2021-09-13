import React from 'react';
import { Link } from 'react-router-dom';

/**
  * New course card
*/
export default function NewCourse(props) {

    return (
        <Link to="/courses/create">
            <div tabIndex="0" className="card veryDarkGreen">
                <div className="details--max-width details">

                    <div className="details__title">
                        <i className="fa fa-plus-circle" aria-hidden="true"></i> Create New Course
                    </div>
                    <div className="details__cost">Share your knowledge with the world.</div>
                </div>
            </div>
        </Link>
    )
}
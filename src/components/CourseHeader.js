import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context';

import courseImage from '../img/courses/workout.png';
/**
  * Site's header, stateless component
*/
export default function Header({ course }) {
    let feature = false;
    const context = useContext(Context);
    const authUser = context.authenticatedUser;

    return (
        <div className="courseHeader neonBlue">
            <header className="container">
                <div className="course">
                    <div className="course__cost">Free</div>
                    <div className="course__title">Home Workout</div>
                    <div className="course__author">Jane R. Smith</div>
                    <div className="course__timeContainer">
                        <div className="course__time">20 min</div>
                    </div>
                    <div className="course__controls">
                        <a className="edit" href="edit.html">Edit</a>
                        <a className="delete" href="delete.html">Delete</a>
                    </div>
                </div>
            </header>
        </div>
    )
}

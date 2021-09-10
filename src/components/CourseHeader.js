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
        <div class="courseHeader neonBlue">
            <header class="container">
                <div class="course">
                    <div class="course__cost">Free</div>
                    <div class="course__title">Home Workout</div>
                    <div class="course__author">Jane R. Smith</div>
                    <div class="course__timeContainer">
                        <div class="course__time">20 min</div>
                    </div>
                    <div class="course__controls">
                        <a class="edit" href="edit.html">Edit</a>
                        <a class="delete" href="delete.html">Delete</a>
                    </div>
                </div>
            </header>
        </div>
    )
}

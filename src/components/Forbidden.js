import React from 'react'
import FourOhFourImage from '../img/courses/svgs/hacker-60b6.svg'

/**
  * Simple user message if they are not allowed to access a route
*/
export default function Forbidden() {
    return (
        <div className="container flex-center">
            <img width="450" height="250" src={FourOhFourImage} alt="404 error toilet paper roll" />
            <h1>You're not authorized to do that.</h1>
        </div>
    )
}

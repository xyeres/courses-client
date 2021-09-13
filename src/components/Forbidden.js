import React from 'react'
import FourOhFourImage from '../img/courses/svgs/hacker-60b6.svg'

/**
  * Simple user message if they are not allowed to access a route
*/
export default function Forbidden() {
    return (
        <div className="container flex-center">
            <img width="450" height="auto" src={FourOhFourImage} alt="Hacker at a computer with glasses" />
            <h1>You're not authorized to do that.</h1>
        </div>
    )
}

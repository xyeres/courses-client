import React from 'react'
import { Link } from 'react-router-dom'
import FourOhFourImage from '../img/courses/svgs/404-60b6.svg'

/**
  * Simple global 404 error 
*/
export default function NotFound() {
    return (
        <div className="container">
            <img width="450" height="250" src={FourOhFourImage} alt="404 error toilet paper roll" />
            <h1>Whoops! 404 - The requested item does not exist.</h1>
            <br />
            <Link to="/" className="btn form__btn">Back home</Link>
        </div>
    )
}

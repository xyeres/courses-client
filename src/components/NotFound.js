import React from 'react'
import { Link } from 'react-router-dom'


/**
  * Simple global 404 error 
*/
export default function NotFound() {
    return (
        <div className="container">
            <h1>Whoops! 404 - The requested item does not exist.</h1>
            <Link to="/" className="btn form__btn">Back home</Link>
        </div>
    )
}

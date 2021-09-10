import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context';

/**
  * Site's footer, stateless component
*/
export default function Footer() {
    const context = useContext(Context);
    const authUser = context.authenticatedUser;

    return (
        <div className="container">
            <footer className="footer">
                &copy;2021 Courses Inc. {authUser ? <Link to="/signout">Hi {authUser.firstName}, signout?</Link> : <Link to="/signin">Signin</Link>}
            </footer>
        </div>
    )
}

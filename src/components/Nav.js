import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context';

/**
  * Site's Navigation, stateless component
*/
export default function Nav({ course }) {
  const context = useContext(Context);
  const authUser = context.authenticatedUser;

  return (
    <nav className="container nav">
      <Link to="/" className="nav__logo">DIY Courses</Link>
      <div className="user">
        {
          authUser ?
            <React.Fragment>
              <div className="user__name user__link"><Link to="/signout">{authUser.firstName}</Link></div>
            </React.Fragment>
            :
            <React.Fragment>
              <div className="user__login"><Link to="/signup" className="user__link">Sign Up</Link></div>
            </React.Fragment>
        }
      </div>
    </nav>
  )
}

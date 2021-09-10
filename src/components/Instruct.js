import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context';
import personImage from '../img/person.png';
/**
  * Instruct CTA, stateless component
*/
export default function Instruct() {
  const context = useContext(Context);
  const authUser = context.authenticatedUser;

  return (
    <>
      {authUser ? null
        : <div class="bgContainer bgContainer--instruct">
          <div class="container">
            <aside class="instruct">
              <img class="instruct__img" src={personImage} alt="person on a bean bag" />
              <div class="instruct__cta">
                <h2 class="instruct__text">Do you want to be an instructor?</h2>
                <Link to='/signup' tabIndex="0" role="button" class="btn btn-light">Start teaching</Link>
              </div>
            </aside>
          </div>
        </div>
      }
    </>
  )
}

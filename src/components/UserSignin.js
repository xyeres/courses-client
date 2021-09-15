import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Form from './Form'
import { Context } from '../Context'


/**
  * Allow user to signin, validate errors if they occur
*/

export default function UserSignin(props) {
  const context = useContext(Context)
  const history = useHistory();

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const handleEmailAddressChage = (event) => {
    setEmailAddress(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  function cancel() {
    history.push('/')
  }

  function submit() {
    const { from } = props.location.state || { from: { pathname: '/' } };

    context.actions.signIn(emailAddress, password)
      .then(user => {
        if (user === null) {
          setErrors(['Sign-in was unsuccessful']);
        } else {
          history.push(from);
        }
      })
      .catch(err => {
        if (err.message.includes('null')) {
          setErrors(['Sign-in was unsuccessful']);
        } else {
          history.push('/error');
        }
      })
  }

  return (
    <main className="container desktopContainer">
      <h1 className="heading featured--heading">Sign in</h1>
      <Form
        cancel={cancel}
        errors={errors}
        submit={submit}
        submitButtonText="Sign In"
        elements={() => (
          <React.Fragment>
            <input
              className="form__input"
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={emailAddress}
              onChange={handleEmailAddressChage}
              placeholder="Email Address" />
            <input
              className="form__input"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password" />
          </React.Fragment>
        )} />
      <div className="form__message">Don't have an account? <Link to="/signup">Sign up!</Link></div>
    </main>
  )
}

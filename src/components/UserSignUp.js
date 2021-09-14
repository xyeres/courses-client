import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../Context';
import errorHandler from '../errorHandler';
import Form from './Form';

/**
  * Signup a user out and redirect them to the root route upon success
  * Return Validation errors if fields are incorrectly filled 
*/
export default function UserSignUp() {
    const context = useContext(Context);
    const history = useHistory();

    // Set state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState([])


    function cancel() {
        history.push('/');
    }
    // *Update and Handle State Changes
    function handleFirstNameChange(e) {
        setFirstName(e.target.value);
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value);
    }

    function handleEmailChange(e) {
        setEmailAddress(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handlePasswordConfirmChange(e) {
        setPasswordConfirm(e.target.value);
    }

    // Handle submit
    function submit() {
        // create user
        const user = {
            firstName,
            lastName,
            emailAddress,
            password
        }

        context.data.createUser(user)
            .then(errors => {
                if (errors.length) {
                    setErrors(errors);
                } else { // sign user in and push them to home page
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                            history.push('/');
                        });
                }
            })
            .catch(err => errorHandler(err, history));
    }

    return (
        <main className="container desktopContainer">
            <h1 className="heading featured--heading">Sign up</h1>
            <p className="heading--subtitle">You're moments away from learning just about anything...</p>

            <Form
                cancel={cancel}
                errors={errors}
                submit={submit}
                submitButtonText="Sign Up"
                elements={() => (
                    <React.Fragment>
                        <input
                            className="form__input"
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            placeholder="First Name" />
                        <input
                            className="form__input"
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={lastName}
                            onChange={handleLastNameChange}
                            placeholder="Last Name" />
                        <input
                            className="form__input"
                            id="emailAddress"
                            name="emailAddress"
                            type="email"
                            value={emailAddress}
                            onChange={handleEmailChange}
                            placeholder="Email Address" />
                        <input
                            className="form__input"
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Password" />
                        <input
                            className="form__input"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            type="password"
                            value={passwordConfirm}
                            onChange={handlePasswordConfirmChange}
                            placeholder="Confirm Password" />
                    </React.Fragment>
                )} />
            <div className="form__message">Already have an account? <Link to="/signin">Sign in!</Link></div>
        </main>
    )
}

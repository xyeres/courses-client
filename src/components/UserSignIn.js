import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

/**
  * Allow user to signin, validate errors if they occur
*/
export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    render() {
        const {
            emailAddress,
            password,
            errors,
        } = this.state;

        return (
            <main className="container desktopContainer">
                <h1 className="heading featured--heading">Sign in</h1>
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Sign In"
                    elements={() => (
                        <React.Fragment>
                            <input
                                className="form__input"
                                id="emailAddress"
                                name="emailAddress"
                                type="email"
                                value={emailAddress}
                                onChange={this.change}
                                placeholder="Email Address" />
                            <input
                                className="form__input"
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={this.change}
                                placeholder="Password" />
                        </React.Fragment>
                    )} />
                <div className="form__message">Don't have an account? <Link to="/signup">Sign up!</Link></div>
            </main>
        );
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { emailAddress, password } = this.state;
        context.actions.signIn(emailAddress, password)
            .then(user => {
                if (user === null) {
                    this.setState(() => {
                        return { errors: ['Sign-in was unsuccessful'] };
                    });
                } else {
                    this.props.history.push(from);
                }
            })
            .catch(err => {
                if (err.message.includes('null')) {
                    this.setState(() => {
                        return { errors: ['Sign-in was unsuccessful'] };
                    })
                } else {
                    this.props.history.push('/error');
                }
            })
    }

    cancel = () => {
        this.props.history.push('/');

    }
}

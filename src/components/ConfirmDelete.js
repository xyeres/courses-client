import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../Context';
import errorHandler from '../errorHandler';
import Form from './Form';

/**
  * Very simple delete confirmation screen to check wether 
  * user want's to actually delete the course
*/
export default function ConfirmDelete(props) {
    const context = useContext(Context);
    const history = useHistory();
    let id = props.match.params.id;

    const [errors, setErrors] = useState([])

    function cancel() {
        history.push(`/courses/${id}`);
    }

    function submit() {
        const authUser = context.authenticatedUser;
        const { emailAddress, password } = authUser;
        context.data.deleteCourse(emailAddress, password, id)
            .then(errors => {
                if (errors.length) {
                    setErrors(errors);
                } else {
                    history.push(`/`);
                }
            })
            .catch(err => {
                setErrors(err);
                errorHandler(err, history);
            });
    }

    return (
        <div className="container">
            <header>
                <h1 className="heading heading--featured"><i className="fa fa-exclamation-circle dangerText" aria-hidden="true"></i> Are
                    you sure?
                </h1>
                <h2 className="heading heading--subtitle">Are you sure you want to delete the course?</h2>
            </header>
            <main>
                <Form
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    buttonclassName="btn btn__danger"
                    submitButtonText="Delete Course"
                    // send null elements so all there is a submit and cancel btn
                    elements={() => { return null }} />
            </main>
        </div>
    );
}
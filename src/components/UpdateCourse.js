import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Context } from '../Context';
import Form from './Form';
import errorHandler from '../errorHandler';

/**
  * Allow an authorized user to update their courses, they must be the original
  * course author to edit
*/
export default function UpdateCourse(props) {
    const context = useContext(Context);
    const authUser = context.authenticatedUser;
    const history = useHistory();
    let id = props.match.params.id;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [time, setTime] = useState('');
    const [mats, setMats] = useState('');
    const [errors, setErrors] = useState([])

    // Get the course we are going to edit
    useEffect(() => {
        let authorId;
        context.data.getCourse(id)
            .then(data => {
                setTitle(data[0].title)
                setDescription(data[0].description)
                setAuthor(`${data[0].user.firstName} ${data[0].user.lastName}`)
                authorId = data[0].userId
                if (data[0].estimatedTime) setTime(data[0].estimatedTime)
                if (data[0].materialsNeeded) setMats(data[0].materialsNeeded)
                return authorId;
            })
            .then(authorID => {
                if (String(authUser.id) !== String(authorId)) {
                    history.push('/forbidden')
                }
            })
            .catch(err => errorHandler(err, history));
    }, [context.data, id, history, authUser.id])
    // Handle form field changes
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleTimeChange = (e) => setTime(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleMatsChange = (e) => setMats(e.target.value);

    // Handle Submit and cancel
    const cancel = () => history.push(`/courses/${id}`);
    function submit() {
        const { emailAddress, password } = authUser;
        const course = {
            title,
            description,
            userId: authUser.id
        }
        course['materialsNeeded'] = mats; // Update these everytime in case they are blank
        course['estimatedTime'] = time;
        // create the course in the DB
        context.data.updateCourse(emailAddress, password, course, id)
            .then(errors => {
                if (errors.length) {
                    setErrors(errors);
                } else {
                    history.push(`/courses/${id}`);
                }
            })
            .catch(err => errorHandler(err, history));
    }

    return (
        <>
            <div className="courseHeader neonBlue">
                <header className="container desktopContainer">
                    <div className="course">
                        <div className="course__title">{title ? `Update course` : `Create course`}</div>
                        <div className="flex-break"></div>
                        <div className="course__author">{title ? `Editing "${title}"` : 'Sharing your knowledge begins here'}</div>
                    </div>
                </header>
            </div>
            <main className="container desktopContainer">
                <Form
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText="Update Course"
                    elements={() => (
                        <>
                            <input
                                className="form__input"
                                id="courseTitle"
                                name="courseTitle"
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="Title" />
                            <input
                                className="form__input"
                                id="courseAuthor"
                                name="courseAuthor"
                                type="text"
                                value={author}
                                disabled={true}
                                placeholder="Author" />
                            <textarea
                                className="form__input"
                                rows="15"
                                id="courseDescription"
                                name="courseDescription"
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Course Description" />
                            <input
                                className="form__input"
                                id="estimatedTime"
                                name="estimatedTime"
                                type="text"
                                value={time}
                                onChange={handleTimeChange}
                                placeholder="Time to complete course (ie: 14 hours)" />
                            <textarea
                                className="form__input"
                                rows="5"
                                id="materialsNeeded"
                                name="materialsNeeded"
                                type="password"
                                value={mats}
                                onChange={handleMatsChange}
                                placeholder="Materials Needed" />
                        </>
                    )} />
            </main>
        </>
    )
}

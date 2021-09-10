import ReactMarkdown from 'react-markdown'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../Context';
import errorHandler from '../errorHandler';

/**
  * Renders a course's full details, and will conditionally
  * render update and delete buttons if user has perms
*/
export default function CourseDetail(props) {
    // Get the ID of the course we want to show
    const id = props.match.params.id;
    // Generate glorious history
    const history = useHistory();
    // Set context
    const context = useContext(Context);
    const authUser = context.authenticatedUser;

    const [course, setCourse] = useState([]);


    useEffect(() => {
        // Get course from API
        context.data.getCourse(id)
            .then(data => setCourse(data))
            .catch(err => errorHandler(err, history));
    }, [context.data, id, history])


    return (
        // Loop result and render course details
        <>{course.map(c => (
            <div key={c.title}>
                <div className="neonBlue">
                    <header className="container">
                        <div className="course">
                            <div className="course__cost">Free</div>
                            <div className="course__title">{c.title}</div>
                            <div className="course__inlineBlockContainer">
                                <div className="course__author">{c.user.firstName} {c.user.lastName}</div>
                            </div>
                            {
                                c.estimatedTime ?
                                    <div className="course__timeContainer">
                                        <div className="course__time">{c.estimatedTime}</div>
                                    </div>
                                    : null
                            }
                            {
                                authUser ?
                                    authUser.id === c.user.id ? // show update and delete btns if they are the course owner
                                        <div className="course__controls">
                                            <Link className="edit" to={`/courses/${c.id}/update`}>Edit</Link>
                                            <Link className="delete" to={`${c.id}/delete`}>Delete</Link>
                                        </div>
                                        : null
                                    : null
                            }
                        </div>
                    </header>
                </div>
                <main class="container courseContainer">
                    <div class="descriptionContainer">
                        <div class="description">
                            <h3 class="description__title">What you will learn:</h3>
                            <div class="description__text">
                                <ReactMarkdown>
                                    {c.description}
                                </ReactMarkdown>
                            </div>
                        </div>
                        {
                            c.estimatedTime ?
                                <div class="time">
                                    <div class="time__title">Estimated time:</div>
                                    <div class="time__timeCount">{c.estimatedTime}</div>
                                </div>
                                : null
                        }
                    </div>
                    {c.materialsNeeded ?
                        <div class="materials">
                            <div class="materials__title">Required items:</div>
                            <ul>
                                <ReactMarkdown>{c.materialsNeeded}</ReactMarkdown>
                            </ul>
                        </div>
                        : null
                    }
                </main>
            </div>
        ))}</>
    )
}

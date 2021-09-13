import ReactMarkdown from 'react-markdown'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Context } from '../Context';
import errorHandler from '../errorHandler';
import randomCourseTheme from '../utils/randomCourseTheme';

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
            .then(data => {
                let { image, color } = randomCourseTheme()
                data[0] = { ...data[0], image, color }
                setCourse(data)
            })
            .catch(err => errorHandler(err, history));
    }, [context.data, id, history])


    return (
        // Loop result and render course details
        <>{course.map(c => (
            <div key={c.title}>
                <div className={`${c.color} courseHeader`}>
                    <header className="container">
                        <div className="course course--flex">
                            <div className="details">
                                <div className="course__cost">Free</div>
                                <div className="course__title">{c.title}</div>
                                <div className='flex-break'></div>
                                <div className="course__author">{c.user.firstName} {c.user.lastName}</div>
                                {
                                    c.estimatedTime ?
                                        <div className={`course__timeContainer`}>
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
                            <div className="card__picture">
                                <img width="180" height="180" src={c.image} alt={c.title} />
                            </div>
                        </div>
                    </header>
                </div>
                <main className="container courseContainer">
                    <div className="descriptionContainer">
                        <div className="description">
                            <h3 className="description__title">What you will learn:</h3>
                            <div className="description__text">
                                <ReactMarkdown>
                                    {c.description}
                                </ReactMarkdown>
                            </div>
                        </div>
                        {
                            c.estimatedTime ?
                                <div className={`time  ${c.color}`}>
                                    <div className="time__title">Estimated time:</div>
                                    <div className="time__timeCount">{c.estimatedTime}</div>
                                </div>
                                : null
                        }
                    </div>
                    {c.materialsNeeded ?
                        <div className="materials">
                            <div className="materials__title">Required items:</div>
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

import React, { useEffect, useState } from 'react';
import CourseList from './CourseList';
import NewCourse from './NewCourse';
import errorHandler from '../errorHandler';
import { useHistory } from 'react-router';
import axios from 'axios';
import sittingWorkout from './../img/courses/workout.png'
import { Link } from 'react-router-dom';
/**
  * Renders all courses, this is the main page of the site
*/
export default function Courses() {
    const history = useHistory();
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get courses using an in-line axios call,
        // This was done for educational purposes, 
        let cancel;
        axios.get("http://localhost:5000/api/courses", {
            cancelToken: new axios.CancelToken(c => cancel = c)
        })
            .then(res => {
                if (res.status === 200) {
                    setData(res.data);
                } else {
                    let err = new Error();
                    err.status = res.status;
                    err.message = 'An error occurred while fetching courses.'
                    throw err;
                }
            })
            .catch((err) => {
                errorHandler(err, history);
            })
            .finally(setIsLoading(false));

        return () => cancel();
    }, [history])

    return (
        <main className="container">
            {
                isLoading ?
                    <p>Loading courses...</p>
                    :
                    <>
                        <h1 className="heading heading--featured">Featured course</h1>
                        <Link to="/courses/1">
                            <div tabIndex="0" className="card neonBlue">
                                <div className="details">
                                    <div className="details__cost">Free</div>
                                    <div className="details__title">Sitting workout</div>
                                    <div className="details__time">20 min</div>
                                </div>
                                <div className="card__picture">
                                    <img src={sittingWorkout} alt="Home Workout" />
                                </div>
                            </div>
                        </Link>
                        <h3 className="heading heading--course">Most Popular</h3>
                        <CourseList data={data} />  <NewCourse />
                    </>
            }
        </main>
    )
}

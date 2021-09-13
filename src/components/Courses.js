import React, { useEffect, useState } from 'react';
import CourseList from './CourseList';
import NewCourse from './NewCourse';
import errorHandler from '../errorHandler';
import { useHistory } from 'react-router';
import axios from 'axios';
import randomCourseTheme from '../utils/randomCourseTheme';

/**
  * Renders all courses, this is the main page of the site
*/
export default function Courses() {
    const history = useHistory();
    const [data, setData] = useState([])
    const [dataFeatured, setDataFeatured] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get courses using an in-line axios call,
        // This was done for educational purposes, 
        let cancel;
        axios.get("https://courses-serve.herokuapp.com/api/courses", {
            cancelToken: new axios.CancelToken(c => cancel = c)
        })
            .then(res => {
                if (res.status === 200) {
                    let data = res.data;
                    /* 
                        Separate the courses by taking the first and making it 'featured' 
                        This is for demonstration purposes and would not be in a production env
                    */
                    if (data.length) {
                        // Add theme to featured course:
                        let featuredCourse = data[0];
                        let { color, image } = randomCourseTheme();
                        featuredCourse = { ...featuredCourse, color, image }
                        // Add theme to all other couress
                        let popularCourses = data.slice(1, data.length)
                        for (let i = 0; i < popularCourses.length; i++) {
                            let { color, image } = randomCourseTheme()
                            popularCourses[i] = { ...popularCourses[i], image, color }
                        }
                        // Set state
                        setDataFeatured([featuredCourse])
                        setData(popularCourses);
                    }

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
                        <CourseList data={dataFeatured} />
                        <h3 className="heading heading--course">Most Popular</h3>
                        <div className="courseContainer">
                            <CourseList data={data} />
                            <div className="flex-break"></div>
                            <NewCourse />
                        </div>
                    </>
            }
        </main>
    )
}

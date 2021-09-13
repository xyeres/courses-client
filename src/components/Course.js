import React from 'react'
import { Link } from 'react-router-dom'
/**
  * Course fragment for main courses page
*/
export default function Course(props) {
  const course = props.course;
  return (
    <Link className="course--module course--link" to={"/courses/" + course.id}>
      <div tabIndex="0" className={"card " + course.color}>
        <div className="details">
          <div className="details__cost">Free</div>
          <div className="details__title">{course.title}</div>
          {course.estimatedTime ? <div className="details__time">{course.estimatedTime}</div> : null}
        </div>
        <div className="card__picture">
          <img width="160" height="160" src={course.image} alt={course.title} />
        </div>
      </div>
    </Link>
  )
}
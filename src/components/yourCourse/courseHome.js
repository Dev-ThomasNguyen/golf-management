import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CourseHome extends Component {
    state = {
        courses: []
    };

    async componentDidMount() {
        const courses = await this.loadData();
        console.log("courses", courses);
        this.setState({
            courses
        });
    }

    loadData = async () => {
        const url = "http://localhost:3000/yourcourse/all";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    handleChange = async event => {
        const changeValue = await this.setState({
            course: event.target.value
        });
        console.log(changeValue);
        return changeValue;
    };

    render() {
        const { courses } = this.state;

        return(
            <>
                <h2>Your Course</h2>
                <ul>
                    {courses.map(course => {
                        console.log('course', course);
                        return ( 
                            <li key={`course-${course.id}`}>
                                <Link to={`/courses/${course.id}`}>
                                {course.clubname}</Link>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default CourseHome;
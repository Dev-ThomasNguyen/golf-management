import React, { Component } from "react";
import {Link } from 'react-router-dom';

class YourCourse extends Component {
    state = {
        course: [] 
    }

async componentDidMount() {
    const course = await this.loadData();
    this.setState({
        course
    });
}

    loadData = async () => {
        const courseId = this.props.match.params.course_id;
        const url = `http://localhost:3000/yourcourse/courses/${courseId}`;
        const response = await fetch(url);
        const data = response.json();
        return data;
    };

    deleteData = async () => {
        const courseId = this.props.match.params.course_id;
        const url = `http://localhost:3000/yourcourse/delete/${courseId}`;
        const response = await fetch(url);
        return response;
    };
    
    render() {
        const { course } = this.state;
        return (
            <div>
                <h2>{course.clubname}</h2>
                <p>{course.city}</p>
                <p>{course.state}</p>
                <Link onClick={this.deleteData} to={`/courses/all`}>
                    Delete course
                </Link>
                <Link to={`/courses/update/${course.id}`}>Update My Course</Link>
            </div>
        );
    }
}

export default YourCourse;
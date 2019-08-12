import React, { Component } from "react";
import {Link } from 'react-router-dom';

class Employees extends Component {
    state = {
        employee: [] 
    }

async componentDidMount() {
    const employee = await this.loadData();
    this.setState({
        employee
    });
}

    loadData = async () => {
        const employeeId = this.props.match.params.employee_id;
        const url = `http://localhost:3000/employee/employees/${employeeId}`;
        const response = await fetch(url);
        const data = response.json();
        return data;
    };

    deleteData = async () => {
        const employeeId = this.props.match.params.employee_id;
        const url = `http://localhost:3000/employee/delete/${employeeId}`;
        const response = await fetch(url);
        return response;
    };
    
    render() {
        const { employee } = this.state;
        return (
            <div>
                <h4>Yard Boy Info</h4>
                <p>{employee.id}</p>
                <p>{employee.firstname}</p>
                <p>{employee.lastname}</p>
                <p>{employee.phone}</p>
                <p>{employee.email}</p>
                <p>{employee.experience}</p>
                <p>{employee.datestarted}</p>
                <p>{employee.course_id}</p>
                <Link onClick={this.deleteData} to={`/employee/all`}>
                    Delete Employee
                </Link>
                <Link to={`/employees/update/${employee.id}`}>Update Employee</Link>
            </div>
        );
    }
}

export default Employees;
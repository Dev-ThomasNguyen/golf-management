import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bulma';
import 'bloomer';

class EmployeeHome extends Component {
    state = {
        employees: []
    };

    async componentDidMount() {
        const employees = await this.loadData();
        console.log("employees", employees);
        this.setState({
            employees
        });
    }

    loadData = async () => {
        const url = "http://localhost:3000/employee/all";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    render() {
        const { employees } = this.state;

        return(
            <>
                <h2>Yard Boys</h2>
                <ul>
                    {employees.map(employee => {
                        console.log('employee', employee);
                        return ( 
                            <li key={`employee-${employee.id}`}>
                                <Link to={`/employees/${employee.id}`}>{employee.firstname}</Link>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default EmployeeHome;
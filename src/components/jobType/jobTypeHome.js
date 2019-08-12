import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class JobTypeHome extends Component {
    state = {
        jobTypes: []
    };

    async componentDidMount() {
        const jobTypes = await this.loadData();
        console.log("jobTypes", jobTypes);
        this.setState({
            jobTypes
        });
    }

    loadData = async () => {
        const url = "http://localhost:3000/jobtype/all";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    handleChange = async event => {
        const changeValue = await this.setState({
          jobTypes: event.target.value
        });
        console.log(changeValue);
        return changeValue;
      };
      
    render() {
        const { jobTypes } = this.state;

        return(
            <>
                <h2>Jobs Type List</h2>
                <ul>
                    {jobTypes.map(jobtype => {
                        return ( 
                            <li key={`job-${jobtype.id}`}>
                                <Link to={`/jobtypes/${jobtype.id}`}>{jobtype.jobtype} </Link>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default JobTypeHome;
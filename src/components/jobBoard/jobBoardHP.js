import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Table } from 'bloomer';

class JobBoardHP extends Component {
    state = {
        jobs: []
    };

    async componentDidMount() {
        const jobs = await this.loadData();
        console.log("jobs", jobs);
        this.setState({
            jobs
        });
    }

    loadData = async () => {
        const url = "http://localhost:3000/jobboard/all";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    handleChange = async event => {
        const changeValue = await this.setState({
          jobs: event.target.value
        });
        console.log(changeValue);
        return changeValue;
      };
    
    render() {
        const { jobs } = this.state;

        return(
            <>
                <h2> Today's Jobs</h2>
                <ul>
                    {jobs.map(job => {
                        return ( 
                            <li key={`job-${job.id}`}>
                                <Card>
                                    <Table isBordered isStriped isNarrow>
                                        <thead>
                                            <tr className='is-selected'>
                                                <th>Date</th>
                                                <th>Job</th>
                                                <th>Employee</th>
                                                <th>Comments</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{job.date}</td>
                                                <td>{job.jobtype}</td>
                                                <td>{job.employee}</td>
                                                <td>{job.comments}</td>
                                            </tr>
                                        </tbody>
                                    </Table> 
                                </Card>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default JobBoardHP;
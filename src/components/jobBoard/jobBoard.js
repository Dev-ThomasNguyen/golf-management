import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Table } from 'bloomer';

class Jobs extends Component {
    state = {
        job: [] 
    }

async componentDidMount() {
    const job = await this.loadData();
    console.log("loadData");
    this.setState({
        job
    });
}

    loadData = async () => {
        const jobboardId = this.props.match.params.jobboard_id;
        const url = `http://localhost:3000/jobboard/jobs/${jobboardId}`;
        const response = await fetch(url);
        const data = response.json();
        return data;
    };

    deleteData = async () => {
        const jobboardId = this.props.match.params.jobboard_id;
        const url = `http://localhost:3000/jobboard/delete/${jobboardId}`;
        const response = await fetch(url);
        window.location.replace('/jobboard/all')
        return response;
    };

    render() {
        const { job } = this.state;
      return (
        <div className="job__board">
          <div className="jobcontainer">
            <div className="spray-color">
               <h1>Job Details</h1> 
               <br /><br />
              <h2>Date</h2> {job.date} <br /><br />
              <h2>Job</h2> {job.jobtype} <br /><br />
              <h2>Employee</h2>{job.firstname} {job.lastname}<br /><br />
              <h2>Comments</h2> {job.comments} <br /><br />
        </div>
        <a onClick={this.deleteData} href="#">
           Delete job
        </a>
        <Link to={`/jobs/update/${job.id}`}>Edit Job Board</Link>
        </div>
        </div>
        );
    }
}

export default Jobs;

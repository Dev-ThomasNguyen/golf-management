import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../helpers/jwt_decode";
import AddJobBoard from "./addJobBoard";

class JobBoardHome extends Component {
  state = {
    jobs: [],
    admin: false
  };

  async componentDidMount() {
    const user = getUser();
    console.log(user);
    if (user == null) {
      this.props.history.replace("/employee/login");
      return;
    }
    if (user && user.user && user.user.adminstatus === "admin") {
      this.setState({
        admin: true
      });
    }
    const jobs = await this.loadData();
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
    return changeValue;
  };

  render() {
    const { jobs } = this.state;

    return (
      <div className="job__board">
        <div className="jobcontainer">
          <h1>Job Board Home</h1>
          <table>
            <thead>
              <tr>
                <td>Date</td>
                <td>Job Type</td>
                <td>Employee</td>
                <td>Comments</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => {
                return (
                  <tr key={`job-${job.id}`}>
                    <td>{job.date}</td>
                    <td>{job.jobtype}</td>
                    <td>
                      {job.fullname}
                      {/* {job.firstname} {job.lastname} */}
                    </td>
                    <td>{job.comments}</td>
                    <td>
                      <Link to={`/jobs/${job.id}`}>View Details</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {this.state.admin === true && <AddJobBoard />}
        </div>
      </div>
    );
  }
}

export default JobBoardHome;

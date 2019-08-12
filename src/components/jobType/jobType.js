import React, { Component } from "react";
import { Link } from 'react-router-dom';

class JobTypes extends Component {
    state = {
        jobtype: [] 
    }

async componentDidMount() {
    const jobtype = await this.loadData();
    this.setState({
        jobtype
    });
}

    loadData = async () => {
        const jobtypeId = this.props.match.params.jobtype_id;
        const url = `http://localhost:3000/jobtype/jobtypes/${jobtypeId}`;
        const response = await fetch(url);
        const data = response.json();
        return data;
    };

    deleteData = async () => {
        const jobtypeId = this.props.match.params.jobtype_id;
        const url = `http://localhost:3000/jobtype/delete/${jobtypeId}`;
        const response = await fetch(url);
        return response;
    };

    render() {
        const { jobtype } = this.state;
        return (
            <div>
                <h2>{jobtype.jobtype}</h2>
                <p>{jobtype.instructions}</p>
                <Link onClick={this.deleteData} to={`/jobtype/all`}>
                    Delete Job Type
                </Link>
                <Link to={`/jobtypes/update/${jobtype.id}`}>Edit Job</Link>
            </div>
        );
    }
}

export default JobTypes;
import React, { Component } from "react";

class JobBoardDate extends Component {
    state = {
        date: [] 
    }

async componentDidMount() {
    const date = await this.loadData();
    this.setState({
        date
    });
}

    loadData = async () => {
        const date = this.props.match.params.date;
        const url = `http://localhost:3000/jobboard/jobs/date/${date}`;
        const response = await fetch(url);
        const data = response.json();
        return data;
    };

    render() {
        const { date } = this.state;
        return (
            <div>
                <h2>{date.jobtype}</h2>
                <p>{date.employee}</p>
                <p>{date.comments}</p>
            </div>
        );
    }
}

export default JobBoardDate;
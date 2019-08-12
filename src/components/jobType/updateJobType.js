import React, { Component } from "react";

class UpdateJob extends Component {
  state = {
    jobType : "",
    instructions : "",
  };

  async componentDidMount() {
    const jobType = await this.loadData();
    console.log(jobType);
    this.setState({
        jobType : jobType.jobtype,
        instructions : jobType.instructions,
    });
  }

    loadData = async () => {
        const jobtypeId = this.props.match.params.jobtype_id;
        const url = `http://localhost:3000/jobtype/jobtypes/${jobtypeId}`;
        const response = await fetch(url);
        const data = response.json();
        return data;
    };

    handleJobTypeChange = e => {
      this.setState({
          jobType: e.target.value
      });
  };

    handleInstructionsChange = e => {
      this.setState({
          instructions: e.target.value
      });
  };

    handleSubmit = e => {
      e.preventDefault();
      const jobtypeId = this.props.match.params.jobtype_id;
      const jobType = this.state.jobType;
      const instructions = this.state.instructions;
      const data = { jobType, instructions };
    const url = `http://localhost:3000/jobtype/jobtypes/update/${jobtypeId}`;
    const response = fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        
      },
      
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 200) {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
    });
  };
  
  render() {
    return (
      <>
        <h2>{this.state.dailyjobboardId}</h2>
        <form onSubmit={this.handleSubmit}>
          <label> Job Type: </label>
          <input
            type="text"
            onChange={this.handleJobTypeChange}
            name="jobType"
            value={this.state.jobType}
          />
          <label> Instructions: </label>
          <input
            type="text"
            onChange={this.handleInstructionsChange}
            name="instructions"
            value={this.state.instructions}
          />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  }
}

export default UpdateJob;
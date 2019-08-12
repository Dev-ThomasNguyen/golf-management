import React, { Component } from 'react'; 

class AddJobType extends Component {
    state = {
        jobType : "",
        instructions : ""
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

    handleSubmit = () => {
        const jobType = this.state.jobType;
        const instructions = this.state.instructions;
        const data = { jobType, instructions };
        const url = `http://localhost:3000/jobtype/post/add`;
        const response = fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.status === 200) {
                this.props.history.push("/all");
            }
            console.log("response is", response);
        })
        .catch(err => {
            console.log(err);
        });

    };

    render() {
        return(
            <>
                <h4>New Job Type</h4>
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

export default AddJobType;
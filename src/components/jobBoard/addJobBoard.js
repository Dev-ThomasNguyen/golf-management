import React, { Component } from 'react'; 
import 'bulma';

class AddJobBoard extends Component {
    state = {
        date : "",
        jobtype : "",
        employee : "",
        comments : "",
        error: null,
        employees: []

    };
    
    componentDidMount = async () => {
      const response = await this.loadData()
      this.setState({
        employees: response
      })
    }
    handleChange = e => {
        this.setState({
          [e.target.id]: e.target.value
        });
      };
  
  loadData = async () => {
        const url = "http://localhost:3000/employee/all";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

  handleSubmit = async (e) => {
    e.preventDefault()
    const date = this.state.date;
    const jobtype = this.state.jobtype;
    const employee = this.state.employee;
    const comments = this.state.comments;
    const url = `http://localhost:3000/jobboard/post/add`;
    try {
      const body = { date, jobtype, employee, comments };
      const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      if (response.status === 200){
        window.location.replace('/jobboard/all')
      } 
    } catch(err) {
      this.setState({
        error: err.message
      })
    }
  };

  render() {
      const employee = this.state.employees.map((co) => {
        return (
          <option value={co.id} key={co.id}>{co.firstname} {co.lastname}</option>
        )
      })

        const error = this.state.error ? this.state.error : null
        return(
           <div className='cardcontainer'>
            <form onSubmit={this.handleSubmit}>
              <p className="error"> { error } </p>
              <div>
                <label>Date</label>
                <input type="date" value={this.state.date} id="date" onChange={this.handleChange} required/>
              </div>
              <div>
                <label>Job</label>
                <input type="text" value={this.state.jobtype} id="jobtype" onChange={this.handleChange} required/>
              </div>
             <div className="select is-medium">
              <label>Employer </label>
               <select id="employee" onChange={this.handleChange}>
                  <option>Select Employee</option>
                  { employee }
               </select>
            </div>

              <div className="field">
                 <div className="control">
                    <label>Comments</label>
                    <textarea className="textarea is-primary" placeholder="Comments" id="comments" onChange={this.handleChange}></textarea>
                 </div>
              </div>
              <div>
                <input type="submit" className="btn-submit" />
              </div>
             </form>
           </div>
        );
    }
}

export default AddJobBoard;

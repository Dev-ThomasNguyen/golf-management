import React, { Component } from "react";
import { getUser } from "../../helpers/jwt_decode";

class AddSpraychart extends Component {
  state = {
    dateApplied: "",
    employee_id: "",
    holesTreated: "",
    lengthOfCutTreated: "",
    chemicalsBeingUsed: "",
    rateApplied: "",
    totalGallons: "",
    sprayRig: "",
    pestOrDiseaseControlled: ""
  };

  componentDidMount = () => {
    const user = getUser();
    if (user && user.user) {
      this.setState({
        employee_id: user.user.id
      });
    }
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    const dateApplied = this.state.dateApplied;
    const employee_id = this.state.employee_id;
    const holesTreated = this.state.holesTreated;
    const lengthOfCutTreated = this.state.lengthOfCutTreated;
    const chemicalsBeingUsed = this.state.chemicalsBeingUsed;
    const rateApplied = this.state.rateApplied;
    const totalGallons = this.state.totalGallons;
    const sprayRig = this.state.sprayRig;
    const pestOrDiseaseControlled = this.state.pestOrDiseaseControlled;
    const data = {
      dateApplied,
      employee_id,
      holesTreated,
      lengthOfCutTreated,
      chemicalsBeingUsed,
      rateApplied,
      totalGallons,
      sprayRig,
      pestOrDiseaseControlled
    };

    console.log(employee_id);
    const url = `http://localhost:3000/spraychart/post/add`;
    // eslint-disable-next-line no-unused-vars
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
          window.location.replace("/spraychart/all");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="cardcontainer">
        <h1>New Spray Chart</h1>
        <form onSubmit={this.handleSubmit}>
          <label> Date Applied: </label>
          <input
            type="date"
            onChange={this.handleChange}
            id="dateApplied"
            value={this.state.dateApplied}
            required
          />
          <label> Holes Treated: </label>
          <input
            type="text"
            onChange={this.handleChange}
            id="holesTreated"
            value={this.state.holesTreated}
            required
          />
          <label> Length of Cut Treated: </label>
          <input
            type="text"
            onChange={this.handleChange}
            id="lengthOfCutTreated"
            value={this.state.lengthOfCutTreated}
            required
          />
          <label> Chemicals Being Used: </label>
          <input
            type="text"
            onChange={this.handleChange}
            id="chemicalsBeingUsed"
            value={this.state.chemicalsBeingUsed}
            required
          />
          <label> Rate Applied: </label>
          <input
            type="text"
            onChange={this.handleChange}
            id="rateApplied"
            value={this.state.rateApplied}
            required
          />
          <label> Total Gallons: </label>
          <input
            type="text"
            onChange={this.handleChange}
            id="totalGallons"
            value={this.state.totalGallons}
            required
          />
          <label> Spray Rig: </label>
          <input
            type="text"
            onChange={this.handleChange}
            id="sprayRig"
            value={this.state.sprayRig}
            required
          />
          <label> Pest or Disease Controlled: </label>
          <input
            type="text"
            onChange={this.handleChange}
            id="pestOrDiseaseControlled"
            value={this.state.pestOrDiseaseControlled}
            required
          />
          <input type="submit" value="Submit" className="btn-submit" />
        </form>
      </div>
    );
  }
}

export default AddSpraychart;

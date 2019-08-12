import React, { Component } from "react";
import { Link } from "react-router-dom";
import 'bulma';

class SprayCharts extends Component {
    state = {
        spraychart: [] 
    }

async componentDidMount() {
    const spraychart = await this.loadData();
    this.setState({
        spraychart
    });
}

    loadData = async () => {
        const spraychartId = this.props.match.params.spraychart_id;
        const url = `http://localhost:3000/spraychart/spraycharts/${spraychartId}`;
        const response = await fetch(url);
        const data = response.json();
        return data;
    };

    deleteData = async () => {
        const spraychartId = this.props.match.params.spraychart_id;
        const url = `http://localhost:3000/spraychart/delete/${spraychartId}`;
        const response = await fetch(url);
        return response;
    };

    render() {
        const { spraychart } = this.state;
        return (
            <div className="job__board">
              <div className="jobcontainer">
                <div className="spray-color">
                   <h1>Spray Details</h1> 
                   <br /><br />
                  <h2>Date Applied</h2> {spraychart.dateapplied} <br /><br />
                  <h2>Employee</h2> {spraychart.firstname} {spraychart.lastname}<br /><br />
                  <h2>Holes Treated </h2> {spraychart.holestreated} <br /><br />
                  <h2>Length of Cut</h2> {spraychart.lengthofcuttreated} <br /><br />
                  <h2>Chemicals</h2>{spraychart.chemicalsbeingused} <br /><br />
                  <h2>Rate Applied</h2>{spraychart.rateapplied} <br /><br />
                  <h2>Total Gallons </h2>{spraychart.totalgallons} <br /><br />
                  <h2>Spray Rig Used </h2>{spraychart.sprayrig} <br /><br />
                  <h2>Pest of Disease Controlled </h2>{spraychart.pestordiseasecontrolled} <br /><br />
                </div>
               <Link onClick={this.deleteData} to={`/spraychart/all`}>
                    Delete spraychart
                </Link>
                <Link to={`/spraycharts/update/${spraychart.id}`}>Update Spraychart</Link>
            </div>
            </div>
        );
    }
}

export default SprayCharts;

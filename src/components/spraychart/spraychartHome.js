import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddSpraychart from './addSpraychart';
import { getUser } from "../../helpers/jwt_decode";

class SpraychartHome extends Component {
    state = {
        spraycharts: []
    };

    async componentDidMount() {
      const user = getUser()
      if (user === null) {
        this.props.history.replace('/employee/login')
      }
      const spraycharts = await this.loadData();
      this.setState({
          spraycharts
      });
    }

    loadData = async () => {
        const url = "http://localhost:3000/spraychart/all";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    handleChange = async event => {
        const changeValue = await this.setState({
            spraychart: event.target.value
        });
        console.log(changeValue);
        return changeValue;
    };

    render() {
        const { spraycharts } = this.state;

        return(
            <div className='job__board'>
              <div className="jobcontainer">
              <h1>Spray Chart</h1>
                 <table>
                  <thead>
                    <tr>
                      <td>Date Applied</td>
                      <td>Employee</td> 
                      <td>Holes Treated</td>
                      <td>Rate Applied</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                  {spraycharts.map(spraychart => {
                      return ( 
                       <tr key={`job-${spraychart.id}`}>
                          <td>{spraychart.dateapplied}</td>
                          <td>{spraychart.firstname} {spraychart.lastname}</td>
                          <td>{spraychart.holestreated}</td>
                          <td>{spraychart.rateapplied}</td>
                          <td><Link to={`/spraycharts/${spraychart.id}`}>View Details</Link></td>
                      </tr>
                    );
                })}
                </tbody>
                </table>
                <AddSpraychart />
                </div>
            </div>
        );
    }
}

export default SpraychartHome;

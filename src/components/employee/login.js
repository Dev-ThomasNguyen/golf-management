
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../helpers/jwt_decode";

class EmployeeLogin extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    message: ""
  };

  componentDidMount = () => {
    const user = getUser()
    if (user && user.user) {
      this.props.history.replace('/');
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleGoogleAuth = async () => {
    const url = "http://localhost:3000/employee/auth/google";
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })

      const data = await response.json();
      console.log(data)
    } catch(err) {
      console.log(err)
    }
  }

  handleFacebookAuth = async () => {
    const url = "http://localhost:3000/employee/auth/google";
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      })

      const data = await response.json();
      console.log(data)
    } catch(err) {
      console.log(err)
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/employee/login";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        });
        const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('token', data.token)
        window.location.replace("/"); 
      }
        if (data.status === 'error') {
            this.setState({
              error: true,
              message: data.message
            })
        }
        } catch (err) {
          this.setState({
            error: true,
            message: err.message
          })
          }
  };

  render() {
    const error = this.state.message
    return (
      <div className='logincontainer'>
        <form onSubmit={this.handleSubmit}>
          <div>
            <p className="error"> { error } </p>
            <label>Email</label>
            <input type="email" value={this.state.email} placeholder="Enter your email address" id="email" onChange={this.handleChange} required/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={this.state.password} placeholder="Enter your password" id="password" onChange={this.handleChange} required/>
          </div>
          <div>
            <input type="submit" className="btn-submit" />
          </div>
          <p>
             Not signed up yet? <Link to="/employee/register">Register here!</Link>
           </p>
      </form>
      <div className="social__auth">
      <a href="http://localhost:3000/employee/auth/google" className="btn-submit social google">Google</a>
      <a href="http://localhost:3000/employee/auth/facebook" className="btn-submit social facebook">Facebook</a>
      </div>

     </div>
    );
  }
}

export default EmployeeLogin;


import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../helpers/jwt_decode';

class Navbar extends Component {
  state = {
    login: false
  }

  componentDidMount = () => {
    const user = getUser();
    if (user && user.user) {
      this.setState({
        login: true
      })
    }
  }

  handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.replace('/')
  }

  render() {
    return (
      <div className="navbarcontainer">
          <div className="navbar__brand">
             <NavLink to='/'><h3>YARDBOYS</h3></NavLink>
          </div>
          <ul>
              <li className='list-item'><NavLink to="/">Home</NavLink></li>
              <li className='list-item'><NavLink to="/jobboard/all">Job Board</NavLink></li>
              <li className='list-item'><NavLink to="/spraychart/all">Spray Chart</NavLink></li>
              { !this.state.login && <li className='list-item'><NavLink to='/employee/login'>Login</NavLink></li> }
              { this.state.login && <li className='list-item' onClick={this.handleLogout}><a href="#">Logout</a></li> }
          </ul>
        </div>
    );
  }
}



export default Navbar;

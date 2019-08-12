import React, { Component, Fragment  } from 'react';
import { Redirect } from 'react-router-dom';

export class VerifyAuth extends Component {
  state = {
    isAuthenticated: ''
  } 
 checkAuthType = (urlString) => {
   if (urlString.includes('twitter')) return 'twitter';
   if (urlString.includes('facebook')) return 'facebook';
   if (urlString.includes('google')) return 'google';
   return 'false';   
  }

 getBaseUrl = (urlType) => {
   const url = 'http://localhost:3000/employee/auth';
   switch (urlType) {
     case 'facebook':
       return `${url}facebook/callback`;
     case 'google':
       return `${url}google/callback`;
     default:
       return null;               
    }
  }
   
  componentDidMount() {
    const { history: { location: { search, pathname  }  }  } = this.props;
    console.log(this.props)
    const socialToken = `${search}`;
    if (this.checkAuthType(pathname) === 'facebook') {

    }

    if (this.checkAuthType(pathname) === 'google') {
    
    }
  }


 render() {
  return (
    <Fragment>
    {this.state.isAuthenticated === true ? <Redirect to='/' /> : null }
            {this.state.isAuthenticated === false
                ? <Redirect to='/employee/login' /> : null }
    </Fragment>
        );
    }
}

export default VerifyAuth;

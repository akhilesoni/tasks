import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      fetch('http://localhost:8000/checkToken',{
        method: 'POST',
            body: JSON.stringify({
              token:localStorage.getItem('token')
            }),
            headers: {
              'Content-Type': 'application/json'
            } 
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }


    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
}

export default withAuth
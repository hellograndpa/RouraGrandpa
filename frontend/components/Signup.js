import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import error from './ErrorMessage';

class Signup extends Component {
  state = {
    email: '',
    name: '',
    lastName: '',
    phone: '',
    lastName: ''
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <fieldset>
          <h2>Sign Up for new user</h2>
          <label htmlFor="email">
            Email
            <input
              type="text"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.saveToState}
            />
          </label>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              placeholder="name"
              value={this.state.name}
              onChange={this.saveToState}
            />
          </label>
          <label htmlFor="lastName">
            lastName
            <input
              type="text"
              name="lastName"
              placeholder="lastName"
              value={this.state.lastName}
              onChange={this.saveToState}
            />
          </label>
          <label htmlFor="phone">
            phone
            <input
              type="text"
              name="phone"
              placeholder="phone"
              value={this.state.phone}
              onChange={this.saveToState}
            />
          </label>
          <label htmlFor="password">
            password
            <input
              type="password"
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.saveToState}
            />
          </label>
        </fieldset>
      </div>
    );
  }
}
export default Signup;

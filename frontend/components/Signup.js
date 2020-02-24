import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';

const ALL_TYPEUSER_QUERY = gql`
  query TYPE_USER_QUERY {
    typeUsers {
      id
      typeName
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $lastname: String!
    $phone: String!
    $password: String!
  ) {
    signup(
      email: $email
      name: $name
      lastname: $lastname
      phone: $phone
      password: $password
    )
  }
`;
class Signup extends Component {
  state = {
    email: '',
    name: '',
    lastname: '',
    phone: '',
    password: '',
    typeUser: ''
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => (
          <form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signup();
              this.setState({
                email: '',
                name: '',
                lastname: '',
                phone: '',
                password: '',
                typeUser: ''
              });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up for new user</h2>
              <Error error={error} />
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
              <label htmlFor="lastname">
                Lastname
                <input
                  type="text"
                  name="lastname"
                  placeholder="lastname"
                  value={this.state.lastname}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="phone">
                Phone
                <input
                  type="text"
                  name="phone"
                  placeholder="phone"
                  value={this.state.phone}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="typeUser">
                Type User
                <Query query={ALL_TYPEUSER_QUERY}>
                  {({ data, error, loading }) => {
                    return data.typeUsers.map(i => i.typeName);
                  }}
                </Query>
              </label>
              <button type="submit">Create New User</button>
            </fieldset>
          </form>
        )}
      </Mutation>
    );
  }
}
export default Signup;

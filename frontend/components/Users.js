import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Pagination from './Pagination';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      lastname
      phone
      email
      typeUser {
        typeName
      }
    }
  }
`;

class Users extends Component {
  render() {
    return (
      <div>
        <h2>User List</h2>
        <Pagination page={this.props.page} />

        <Query query={ALL_USERS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p> Error: {error.message}</p>;

            return (
              <p>
                <table>
                  {data.users.map((user, index) => {
                    const {
                      id,
                      name,
                      lasname,
                      email,
                      phone,
                      typeUser: { typeName },
                    } = user;
                    return (
                      <tr>
                        <td> {id}</td>
                        <td> {name}</td>
                        <td> {lasname}</td>
                        <td> {email}</td>
                        <td> {phone}</td>
                        <td> {typeName}</td>
                      </tr>
                    );
                  })}
                </table>
              </p>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </div>
    );
  }
}

export default Users;

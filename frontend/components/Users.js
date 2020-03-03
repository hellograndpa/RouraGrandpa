import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
        <p>users!</p>
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
                      typeUser: { typeName }
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
      </div>
    );
  }
}

export default Users;

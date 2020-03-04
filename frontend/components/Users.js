import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    users(first: $first, skip: $skip, orderBy: createAt_DESC) {
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
        <Pagination page={this.props.page}></Pagination>

        <Query
          query={ALL_USERS_QUERY}
          variables={{
            skip: 2,
            first: 4
          }}
        >
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
        <Pagination page={this.props.page}></Pagination>
      </div>
    );
  }
}

export default Users;

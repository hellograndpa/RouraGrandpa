/** @format */

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Pagination from './Pagination.component';
import { perPage } from '../../config';
import styled from 'styled-components';

const CustomTable = styled.table`
  table,
  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th,
  td,
  tr {
    padding: 5px;
  }
  th {
    text-align: left;
  }
  table {
    width: 100%;
  }
`;

const ALL_USERGRANPA_QUERY = gql`
  query ALL_USERGRANPA_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    userGrandpas(first: $first, skip: $skip, orderBy: createDate_DESC) {
      id
      name
      lastName

    }
  }
`;

class Elders extends Component {
  render() {
    return (
      <div>
        <h2>User List</h2>
        <Pagination page={this.props.page} />

        <Query
          query={ALL_USERGRANPA_QUERY}
          fetchPolicy="network-only"
          variables={{
            skip: this.props.page * perPage - perPage,
            first: perPage,
          }}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p> Error: {error.message}</p>;

            return (
              <CustomTable>
                <thead>
                  <tr>
                    <th> id</th>
                    <th> Name</th>
                    <th> Last Name</th>
                    <th> Phone </th>
                  </tr>
                </thead>
                <tbody>
                  {data.userGrandpas.map((user, index) => {
                    const { id, name, lastName, phone } = user;
                    return (
                      <tr key={id}>
                        <td> {id}</td>
                        <td> {name}</td>
                        <td> {lastName}</td>
                        <td> {phone}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </CustomTable>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </div>
    );
  }
}

export default Elders;

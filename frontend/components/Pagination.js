import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    usersConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <div>
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        const { count } = data.usersConnection.aggregate;
        const pages = count / perPage;
        return <p>page 1 of {pages}</p>;
      }}
    </Query>
  </div>
);

export default Pagination;

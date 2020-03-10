/** @format */

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const USERTECH_QUERY = gql`
  query USERTECH_QUERY {
    userTeches {
      id
      association {
        name
      }
      title
      titleOthers
      phoneOffice
    }
  }
`;

const UserTech = props => (
  <Query query={USERTECH_QUERY}>
    {({ data: { userTeches }, error, loading }) => {
      const tech = userTeches[0];
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      if (!userTeches) return <p>You need actualization data</p>;
      if (userTeches) {
        return (
          <div>
            <p>association: {tech.association.name}</p>
            <p>title: {tech.title}</p>
            <p>titleOthers: {tech.titleOthers}</p>
            <p>phoneOffice: {tech.phoneOffice}</p>
          </div>
        );
      }
    }}
  </Query>
);

export default UserTech;

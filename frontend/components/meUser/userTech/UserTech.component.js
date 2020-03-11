/** @format */

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const USERTECH_QUERY = gql`
  query USERTECH_QUERY {
    userTeches {
      id
      userId {
        id
        name
      }
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
  <Query query={USERTECH_QUERY} fetchPolicy="network-only">
    {({ data: { userTeches }, error, loading }) => {
      const tech = userTeches[0];
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      if (!tech) return <p>You need edit your profile data</p>;
      if (tech) {
        return (
          <div>
            <p>id: {tech.id}</p>
            <p>user: {tech.userId.name}</p>
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

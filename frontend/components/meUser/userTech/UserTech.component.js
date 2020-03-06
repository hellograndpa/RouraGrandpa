import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const USERTECH_QUERY = gql`
  query USERTECH_QUERY {
    userTech {
      id
      userId {
        id
      }
      association {
        id
      }
      title
      titleOthers
      phoneOffice
    }
  }
`;

const TechUser = props => (
  <Query query={USERTECH_QUERY}>
    {({ data: { userTech }, error, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error: {error.message}</p>;
      if (!userTech) return <p>You need actualization data</p>;
      if (userTech) {
        return (
          <div>
            <p>Id: {userTech.id}</p>
            <p>association: {userTech.association}</p>
            <p>title: {userTech.title}</p>
            <p>titleOthers: {userTech.titleOthers}</p>
            <p>phoneOffice: {userTech.phoneOffice}</p>
          </div>
        );
      }
    }}
  </Query>
);

export default TechUser;

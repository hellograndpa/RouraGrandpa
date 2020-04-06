/** @format */

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './ErrorMessage';
import Link from 'next/link';
import Head from 'next/head';
//style
import { H2 } from '@bootstrap-styled/v4';

const SINGLE_USERGRANDPA_QUERY = gql`
  query SINGLE_USERGRANDPA_QUERY($id: ID!) {
    userGrandpa(where: { id: $id }) {
      id
      name
      lastName
      phone
      adress
    }
  }
`;
class SingleElder extends Component {
  render() {
    const { id } = this.props;
    return (
      <Query
        query={SINGLE_USERGRANDPA_QUERY}
        variables={{
          id: this.props.id,
        }}>
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.userGrandpa)
            return <p>No Item Found for {this.props.id} </p>;
          const userGrandpa = data.userGrandpa;
          return (
            <>
              <Head>
                <title>PB | {userGrandpa.name}</title>
              </Head>
              <H2>
                {userGrandpa.name} | {userGrandpa.lastName} |
                {userGrandpa.secondLastName}
              </H2>
              ;
            </>
          );
        }}
      </Query>
    );
  }
}

export default SingleElder;

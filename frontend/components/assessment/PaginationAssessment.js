/** @format */

import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';

import styled from 'styled-components';

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  & > * {
    margin: 0;
    padding: 15px 30px;
    &:last-child {
      border-right: 0;
    }
  }
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`;

const PAGINATION_ASSESSMENT_QUERY = gql`
  query PAGINATION_ASSESSMENT_QUERY($id: ID!) {
    evaluationGrandpasConnection(where: { userGrandpa: { id: $id } }) {
      aggregate {
        count
      }
    }
  }
`;

class PaginationAssessment extends Component {
  render() {
    const { id, assessment } = this.props;
    return (
      <Query query={PAGINATION_ASSESSMENT_QUERY} variables={{ id }}>
        {({ data, loading, error }) => {
          if (error) return <p>Error: {error.message}</p>;
          if (loading) return <p>Loading...</p>;
          if (!data.evaluationGrandpasConnection) {
            return <p>no tiene aggregate {id} </p>;
          }
          const { count } = data.evaluationGrandpasConnection.aggregate;

          return (
            <PaginationStyles>
              <Link
                prefetch
                href={{
                  query: { id, assessment: assessment - 1 }
                }}>
                <a aria-disabled={assessment <= 1}> {'< '} Previo</a>
              </Link>
              <p>
                assessment {assessment} of {count}
              </p>
              <Link
                href={{
                  query: { id, assessment: assessment + 1 }
                }}>
                <a aria-disabled={assessment === count}>Siguiente {' >'}</a>
              </Link>
            </PaginationStyles>
          );
        }}
      </Query>
    );
  }
}

export default PaginationAssessment;

/** @format */

import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { perPage } from '../../config';

import Head from 'next/head';
import Link from 'next/link';

import styled from 'styled-components';

import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from '@bootstrap-styled/v4';

const Enlace = styled.a`
  a[aria-disabled='true'] {
    color: grey;
    pointer-events: none;
  }
`;

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    userGrandpasConnection {
      aggregate {
        count
      }
    }
  }
`;

const PaginationComponent = props => (
  <div>
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        const { page } = props;
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        const { count } = data.userGrandpasConnection.aggregate;
        const pages = Math.ceil(count / perPage);
        return (
          <Pagination>
            <Head>
              <title>
                HelloGrandpa - Usuarios Abuelos - page {page} of {pages}
              </title>
            </Head>
            <PaginationItem>
              <PaginationLink previous>
                <Link
                  prefetch
                  href={{
                    pathname: 'elders',
                    query: { page: page - 1 },
                  }}>
                  <a aria-disabled={page <= 1}> {'< '} Previo</a>
                </Link>
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              page {page} of {pages}
            </PaginationItem>
            <PaginationItem>
              <PaginationLink next>
                <Link
                  href={{
                    pathname: 'elders',
                    query: { page: page + 1 },
                  }}>
                  <a aria-disabled={page === pages}>Siguiente {' >'}</a>
                </Link>
              </PaginationLink>
            </PaginationItem>
          </Pagination>
        );
      }}
    </Query>
  </div>
);

export default PaginationComponent;

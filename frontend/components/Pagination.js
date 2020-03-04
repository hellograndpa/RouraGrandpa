import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { perPage } from '../config';

import Head from 'next/head';
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

const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		usersConnection {
			aggregate {
				count
			}
		}
	}
`;

const Pagination = (props) => (
	<div>
		<Query query={PAGINATION_QUERY}>
			{({ data, loading, error }) => {
				const { page } = props;
				if (loading) return <p>Loading...</p>;
				if (error) return <p>Error: {error.message}</p>;
				const { count } = data.usersConnection.aggregate;
				const pages = Math.ceil(count / perPage);
				return (
					<PaginationStyles>
						<Head>
							<title>
								HelloGrandpa - Usuarios - page {page} of {pages}
							</title>
						</Head>
						<Link
							prefetch
							href={{
								pathname: 'users',
								query: { page: page - 1 },
							}}>
							<a aria-disabled={page <= 1}> {'< '} Previo</a>
						</Link>
						<p>
							page {page} of {pages}
						</p>
						<Link
							href={{
								pathname: 'users',
								query: { page: page + 1 },
							}}>
							<a aria-disabled={page === pages}>Siguiente {' >'}</a>
						</Link>
					</PaginationStyles>
				);
			}}
		</Query>
	</div>
);

export default Pagination;

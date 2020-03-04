import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    users(first: $first, skip: $skip, orderBy: createDate_DESC) {
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
				<Pagination page={this.props.page} />

				<Query
					query={ALL_USERS_QUERY}
					variables={{
						skip: this.props.page * perPage - perPage,
						first: perPage,
					}}>
					{({ data, error, loading }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p> Error: {error.message}</p>;

						return (
							<table>
								<thead>
									<tr>
										<td> id</td>
										<td> Name</td>
										<td> Last Name</td>
										<td> Email</td>
										<td> Phone </td>
										<td> Type of User</td>
									</tr>
								</thead>
								<tbody>
									{data.users.map((user, index) => {
										const { id, name, lastname, email, phone, typeUser: { typeName } } = user;
										return (
											<tr key={id}>
												<td> {id}</td>
												<td> {name}</td>
												<td> {lastname}</td>
												<td> {email}</td>
												<td> {phone}</td>
												<td> {typeName}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						);
					}}
				</Query>
				<Pagination page={this.props.page} />
			</div>
		);
	}
}

export default Users;

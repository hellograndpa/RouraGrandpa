import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../ErrorMessage';

import User from './UserMe.component';

const UPDATE_USER_MUTATION = gql`
	mutation UPDATE_PROFILE_MUTATION($id: ID!, $email: String, $name: String, $lastname: String, $phone: String) {
		updateMe(id: $id, email: $email, name: $name, lastname: $lastname, phone: $phone) {
			id
			email
			name
			lastname
			phone
		}
	}
`;

class ProfileEdit extends Component {
	state = {};

	saveToState = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	updateMe = async (e, updateUserMutation, meId) => {
		e.preventDefault();
		const res = await updateUserMutation({
			variables: {
				id: meId,
				...this.state,
			},
		});
	};

	render() {
		return (
			<User>
				{({ data: { me } }) => {
					if (me) {
						return (
							<Mutation mutation={UPDATE_USER_MUTATION} variables={this.state}>
								{(updateMe, { loading, error }) => (
									<form
										method="post"
										onSubmit={(e) => {
											this.updateMe(e, updateMe, me.id);
										}}>
										<Error error={error} />
										<fieldset disabled={loading} aria-busy={loading}>
											<h2>Sign Up for new user</h2>
											<label htmlFor="email">
												Email
												<input
													type="text"
													name="email"
													placeholder="email"
													defaultValue={me.email}
													onChange={this.saveToState}
												/>
											</label>
											<label htmlFor="name">
												Name
												<input
													type="text"
													name="name"
													placeholder="name"
													defaultValue={me.name}
													onChange={this.saveToState}
												/>
											</label>
											<label htmlFor="lastname">
												Lastname
												<input
													type="text"
													name="lastname"
													placeholder="lastname"
													defaultValue={me.lastname}
													onChange={this.saveToState}
												/>
											</label>
											<label htmlFor="phone">
												Phone
												<input
													type="text"
													name="phone"
													placeholder="phone"
													defaultValue={me.phone}
													onChange={this.saveToState}
												/>
											</label>
											<button type="submit">Update User</button>
										</fieldset>
									</form>
								)}
							</Mutation>
						);
					}
					return null;
				}}
			</User>
		);
	}
}

export default ProfileEdit;

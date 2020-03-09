import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const CREATE_USERTECH_MUTATION = gql`
  mutation CREATE_USERTECH_MUTATION(
    $userId: String
    $association: String
    $title: String
    $titleOthers: String
    $phoneOffice: String
  ) {
    createUserTech(
      userId: $userId
      association: $association
      title: $title
      titleOthers: $titleOthers
      phoneOffice: $phoneOffice
    ) {
      id
      userId
      association
      title
      titleOthers
      phoneOffice
    }
  }
`;
const USERTECH_QUERY = gql`
  query USERTECH_QUERY {
    userTech {
      association
      title
      titleOthers
      phoneOffice
    }
  }
`;

class TechUser extends Component {
  state = {
    userId: "",
    association: "",
    title: "",
    titleOthers: "",
    phoneOffice: ""
  };
  render() {
    return (
      <Query query={USERTECH_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          if (!data.userTech) {
            return (
              <Mutation
                userId={this.props.userId}
                mutation={CREATE_USERTECH_MUTATION}
                variables={this.state}
              >
                {(createUserTech, { error, loading }) => (
                  <form
                    method="post"
                    onSubmit={async e => {
                      e.preventDefault();
                      this.setSatate({ ...this.state, userId });
                      await signup();
                    }}
                  >
                    <fieldset disabled={loading} aria-busy={loading}>
                      <h2>Sign Up for new user</h2>
                      <Error error={error} />
                      <label htmlFor="association">
                        association
                        <input
                          type="text"
                          name="association"
                          placeholder="association"
                          value={this.state.association}
                          onChange={this.saveToState}
                        />
                      </label>
                      <label htmlFor="title">
                        title
                        <input
                          type="text"
                          name="title"
                          placeholder="title"
                          value={this.state.title}
                          onChange={this.saveToState}
                        />
                      </label>
                      <label htmlFor="titleOthers">
                        titleOthers
                        <input
                          type="text"
                          name="titleOthers"
                          placeholder="titleOthers"
                          value={this.state.titleOthers}
                          onChange={this.saveToState}
                        />
                      </label>
                      <label htmlFor="phoneOffice">
                        phoneOffice
                        <input
                          type="text"
                          name="phoneOffice"
                          placeholder="phoneOffice"
                          value={this.state.phoneOffice}
                          onChange={this.saveToState}
                        />
                      </label>
                      <button type="submit">Create New User</button>
                    </fieldset>
                  </form>
                )}
              </Mutation>
            );
          }
        }}
      </Query>
    );
  }
}

export default TechUser;

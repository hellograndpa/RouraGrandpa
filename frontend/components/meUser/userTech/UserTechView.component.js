/** @format */

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UserTechCreate from './UserTechCreate.component';

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
class UserTechView extends Component {
  state = {
    edition: false,
  };

  handleEdition = () => {
    this.setState({
      edition: !this.state.edition,
    });
  };
  render() {
    const { edition } = this.state;
    return (
      <div>
        <Query query={USERTECH_QUERY} fetchPolicy="network-only">
          {({ data: { userTeches }, error, loading }) => {
            const tech = userTeches[0];
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            if (!tech) {
              return (
                <div>
                  <p>Por favor, amplía tus datos </p>
                  <UserTechCreate me={props.me} />
                </div>
              );
            } else {
              return (
                <div>
                  {!edition && (
                    <>
                      <button onClick={this.handleEdition}>Edit profile</button>
                      <p>id: {tech.id}</p>
                      <p>user: {tech.userId.name}</p>
                      <p>association: {tech.association.name}</p>
                      <p>title: {tech.title}</p>
                      <p>titleOthers: {tech.titleOthers}</p>
                      <p>phoneOffice: {tech.phoneOffice}</p>
                    </>
                  )}
                  {edition && (
                    <>
                      <button onClick={this.handleEdition}>
                        Cerrar edición de tech
                      </button>
                      <UserTechEdit />
                    </>
                  )}
                </div>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

export default UserTechView;
export { USERTECH_QUERY };

/** @format */

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UserTechCreate from './UserTechCreate.component';
import UserTechEdit from './userTechEdit.component';
import Error from '../../ErrorMessage';

const USERTECH_QUERY = gql`
  query USERTECH_QUERY {
    userTechesUserId {
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
    const { me } = this.props;
    return (
      <div>
        <Query query={USERTECH_QUERY} fetchPolicy="network-only">
          {({ data: { userTechesUserId }, error, loading }) => {
            if (!userTechesUserId) {
              return (
                <div>
                  <p>Por favor, amplía tus datos </p>
                  <UserTechCreate me={me} />
                </div>
              );
            }
            const tech = userTechesUserId[0];
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading...</p>;
            if (!tech) {
              return (
                <div>
                  <p>Por favor, amplía tus datos </p>
                  <UserTechCreate me={me} />
                </div>
              );
            } else {
              return (
                <div>
                  {!edition && (
                    <>
                      <button onClick={this.handleEdition}>
                        Edita la ampliación de datos
                      </button>
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
                      <UserTechEdit tech={tech} me={me} />
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

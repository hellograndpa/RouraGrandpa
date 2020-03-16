/** @format */

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UserTechCreate from './UserStudentCreate.component';
import UserTechEdit from './userStudentEdit.component';

const USERSTUDENT_QUERY = gql`
  query USERSTUDENT_QUERY {
    userStudent {
      id
      userId {
        id
        name
      }
      association {
        id
        name
      }
      typeDocument
      numberDocument
      techResponsible {
        id
        name
      }
      studing
      career {
        id
      }
      university {
        id
      }
      classSchedule
      sourceExternal {
        id
      }
      gender
      birthData
      originCountry {
        id
      }
      weekendFree
      evaluation {
        id
      }
      interview {
        id
      }
      state
      adress
      createDate
      updateDate
      imageDocument
      imageProfile
      imageUniversity
      coupleID {
        id
      }
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
        <Query query={USERSTUDENT_QUERY} fetchPolicy="network-only">
          {({ data: { userStudent }, error, loading }) => {
            const student = userStudent[0];
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            if (!student) {
              return (
                <div>
                  <p>Por favor, amplía tus datos </p>
                  <UserStudentCreate me={me} />
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
                      <p>id: {student.id}</p>
                    </>
                  )}
                  {edition && (
                    <>
                      <button onClick={this.handleEdition}>
                        Cerrar edición de Student
                      </button>
                      <UserStudentEdit student={student} me={me} />
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
export { USERSTUDENT_QUERY };

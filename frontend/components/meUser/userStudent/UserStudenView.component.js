/** @format */

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UserStudentCreate from './UserStudentCreate.component';
import UserStudentEdit from './userStudentEdit.component';

const USERSTUDENT_QUERY = gql`
  query USERSTUDENT_QUERY {
    userStudents {
      id
      userId {
        id
      }
      association {
        id
      }
      typeDocument
      numberDocument
      techResponsible {
        id
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
      imageDocument {
        id
      }
      imageProfile
      imageUniversity {
        id
      }
      coupleID {
        id
      }
    }
  }
`;
class UserStudentView extends Component {
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
          {({ data: { userStudents }, error, loading }) => {
            const student = userStudents[0];
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
                      <p>userId: {student.userId.id}</p>
                      <p>association: {student.association.id}</p>
                      <p>typeDocument: {student.typeDocument}</p>
                      <p>numberDocument: {student.numberDocument}</p>
                      <p>techResponsible: {student.techResponsible.id}</p>
                      <p>studing: {student.studing}</p>
                      <p>career: {student.career.id}</p>
                      <p>university: {student.university.id}</p>
                      <p>classSchedule: {student.classSchedule}</p>
                      {student.sourceExternal && (
                        <p>sourceExternal: {student.sourceExternal.id}</p>
                      )}
                      <p>gender: {student.gender}</p>
                      <p>birthData: {student.birthData}</p>
                      <p>originCountry: {student.originCountry.id}</p>
                      <p>weekendFree: {student.weekendFree}</p>
                      <p>evaluation: {student.evaluation.id}</p>
                      <p>interview: {student.interview.id}</p>
                      <p>state: {student.state.id}</p>
                      <p>adress: {student.adress}</p>
                      <p>createDate: {student.createDate}</p>
                      <p>updateDate: {student.updateDate}</p>
                      <p>imageDocument: {student.imageDocument.id}</p>
                      <p>imageUniversity: {student.imageUniversity.id}</p>
                      <p>coupleID: {student.coupleID}</p>
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

export default UserStudentView;
export { USERSTUDENT_QUERY };

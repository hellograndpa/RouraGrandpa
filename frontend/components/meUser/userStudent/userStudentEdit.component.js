/** @format */

import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../../ErrorMessage';
import { ALL_ASSOCIATIONS_QUERY } from '../userTech/UserTechCreate.component';

const UPDATE_USERSTUDENT_MUTATION = gql`
  mutation UPDATE_USERSTUDENT_MUTATION(
    $id: ID!
    $userId: ID!
    $association: ID
    $typeDocument: String
    $numberDocument: String
    $techResponsible: ID
    $studing: String
    $career: ID
    $university: ID
    $classSchedule: String
    $sourceExternal: ID
    $gender: String
    $birthData: DateTime
    $originCountry: ID
    $weekendFree: String
    $evaluation: [ID]
    $interview: [ID]
    $state: String
    $adress: String
    $imageDocument: [String]
    $imageProfile: String
    $imageUniversity: [String]
    $coupleID: ID
  ) {
    updateUserStudent(
      id: $id
      userId: $userId
      association: $association
      adress: $adress
      birthData: $birthData
      career: $career
      classSchedule: $classSchedule
      coupleID: $coupleID
      evaluation: $evaluation
      gender: $gender
      interview: $interview
      imageDocument: $imageDocument
      imageProfile: $imageProfile
      imageUniversity: $imageUniversity
      numberDocument: $numberDocument
      originCountry: $originCountry
      sourceExternal: $sourceExternal
      state: $state
      studing: $studing
      techResponsible: $techResponsible
      typeDocument: $typeDocument
      university: $university
      weekendFree: $weekendFree
    ) {
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

class UserStudentEdit extends Component {
  state = {};

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateUserStudent = async (e, updateUseStudentMutation, meId, techId) => {
    e.preventDefault();
    const res = await updateUseStudentMutation({
      variables: {
        id: techId,
        userId: meId,
        ...this.state,
      },
    });
  };

  render() {
    const { student, me } = this.props;
    return (
      <Mutation mutation={UPDATE_USERSTUDENT_MUTATION} variables={this.state}>
        {(updateUserStudent, { loading, error }) => (
          <form
            method="post"
            onSubmit={e => {
              this.updateUserStudent(e, updateUserStudent, me.id, student.id);
            }}>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <h3>COMPLETA TUS DATOS {student.id}</h3>
              <Error error={error} />
              <label htmlFor="Association">
                Association
                <select
                  name="association"
                  placeholder="association"
                  value={this.state.association}
                  defaultValue={student.association}
                  onChange={this.saveToState}>
                  <option>Selecciona una asociación</option>
                  <Query query={ALL_ASSOCIATIONS_QUERY}>
                    {({ data, error, loading }) => {
                      if (loading) return <option>loading...</option>;
                      return data.associations.map(i => (
                        <option key={i.id} value={i.id}>
                          {i.name}
                        </option>
                      ));
                    }}
                  </Query>
                </select>
              </label>
              <label htmlFor="typeDocument">
                Documento de identidad
                <select
                  name="typeDocument"
                  placeholder="typeDocument"
                  value={this.state.typeDocument}
                  defaultValue={student.typeDocument}
                  onChange={this.saveToState}>
                  <option value="DNI">DNI</option>
                  <option value="NIE">NIE</option>
                </select>
              </label>
              <label htmlFor="numberDocument">
                Nº de documento
                <input
                  type="text"
                  name="numberDocument"
                  placeholder="numberDocument"
                  value={this.state.numberDocument}
                  defaultValue={student.numberDocument}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="studing">
                Estoy Estudiando
                <input
                  type="text"
                  name="studing"
                  placeholder="studing"
                  value={this.state.studing}
                  defaultValue={student.studing}
                  onChange={this.saveToState}
                />
              </label>
              {/* // TODO you need a query to get all careers*/}

              <label htmlFor="career">Carrera (hay que hacer la query)</label>
              <label htmlFor="University">
                Univeridad (hay que hacer la query)
              </label>
              <label htmlFor="classSchedule">
                {/* // TODO we have to deicide how to do this */}
                Horario de clase
                <input
                  type="text"
                  name="classSchedule"
                  placeholder="classSchedule"
                  value={this.state.classSchedule}
                  defaultValue={student.classSchedule}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="sourceExternal">
                sourceExternal (no se eue es y hay que hacer la query)
              </label>
              <label htmlFor="sourceExternal">
                sourceExternal (no se eue es)
                <input
                  type="text"
                  name="sourceExternal"
                  placeholder="sourceExternal"
                  value={this.state.sourceExternal}
                  defaultValue={student.sourceExternal}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="NO_GENDE">
                Género
                <select
                  name="gender"
                  placeholder="NO_GENDE"
                  value={this.state.gender}
                  defaultValue={student.gender}
                  onChange={this.saveToState}>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="NO_GENDE">NO GENDE</option>
                </select>
              </label>
              <label htmlFor="birthData">
                birthData (no se eue es y hay que hacer la query)
              </label>
              <label htmlFor="originCountry">
                originCountry (no se eue es y hay que hacer la query)
              </label>
              <label htmlFor="weekendFree">
                Sin ocupación los fines de semana
                <input
                  type="text"
                  name="weekendFree"
                  placeholder="weekendFree"
                  value={this.state.weekendFree}
                  defaultValue={student.weekendFree}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="evaluation">
                Evaluation (hay que hacer la query y hay hacer array)
              </label>
              <label htmlFor="interview">
                Interview (hay que hacer la query y hay hacer array)
              </label>
              <label htmlFor="state">
                País
                <input
                  type="text"
                  name="state"
                  placeholder="state"
                  value={this.state.state}
                  defaultValue={student.state}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="adress">
                Adress
                <input
                  type="text"
                  name="adress"
                  placeholder="adress"
                  value={this.state.adress}
                  defaultValue={student.adress}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="imageDocument">
                imageDocument (hay que hacer la query y hay hacer array)
              </label>
              <label htmlFor="imageProfile">
                imageProfile (hay que hacer la query y hay hacer array)
              </label>
              <label htmlFor="imageUniversity">
                imageUniversity (hay que hacer la query y hay hacer array)
              </label>
              <label htmlFor="coupleID">
                coupleID (hay que hacer la query y hay hacer array)
              </label>

              <button type="submit">Gaurdar datos de usuario</button>
            </fieldset>
          </form>
        )}
      </Mutation>
    );
  }
}

export default UserStudentEdit;

/** @format */

import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../../ErrorMessage';

const permissions = [USER, ADMIN, TECH, STUDENT, ADMINASSOCIATION, GRANDPA];

const ALL_ASSOCIATIONS_QUERY = gql`
  query ALL_ASSOCIATIONS_QUERY {
    associations {
      name
    }
  }
`;

const CREATE_USERTECH_MUTATION = gql`
  mutation CREATE_USERTECH_MUTATION(
    $userId: ID!
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
      userId {
        id
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

class UserTechCreate extends Component {
  state = {
    userId: '',
    association: '',

    titleOthers: '',
    phoneOffice: '',
  };

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const userId = this.props.me.id;
    return (
      <div>
        <Mutation mutation={CREATE_USERTECH_MUTATION} variables={this.state}>
          {(createUserTech, { error, loading }) => (
            <form
              method="post"
              onSubmit={async e => {
                e.preventDefault();
                this.setState({ ...this.state, userId });
                await createUserTech();
              }}>
              <fieldset disabled={loading} aria-busy={loading}>
                <h3>COMPLETA TUS DATOS</h3>
                <Error error={error} />
                <label htmlFor="Association">
                  Association
                  <select
                    name="association"
                    placeholder="association"
                    value={this.state.association}
                    onChange={this.saveToState}>
                    <option>Selecciona una asociación</option>
                    <Query query={ALL_ASSOCIATIONS_QUERY}>
                      {({ data, error, loading }) => {
                        if (loading) return <option>loading...</option>;
                        return data.associations.map(i => (
                          <option key={i.id} value={i.name}>
                            {i.name}
                          </option>
                        ));
                      }}
                    </Query>
                  </select>
                </label>
                <label htmlFor="title">
                  Título o cargo en la Asociación
                  <select
                    name="title"
                    placeholder="title"
                    value={this.state.title}
                    onChange={this.saveToState}>
                    <option>Selecciona un Título</option>
                    {permissions.map(i => {
                      <option value={i}>{i}}</option>;
                    })}
                    {/* <option value="PSICOLOGO">PSICOLOGO</option>
                      <option value="TARBAJADOR_SOCIAL">TARBAJADOR SOCIAL</option>
                      <option value="ADMINISTRATIVO">ADMINISTRATIVO</option>
                      <option value="GESTOR">GESTOR</option>
                      <option value="OTROS">OTROS</option> */}
                  </select>
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
                <button type="submit">Gaurdar datos de usuario</button>
              </fieldset>
            </form>
          )}
        </Mutation>
      </div>
    );
  }
}

export default UserTechCreate;

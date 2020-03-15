/** @format */

import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../../ErrorMessage';
import { ALL_ASSOCIATIONS_QUERY } from './UserTechCreate.component';

const UPDATE_USERTECH_MUTATION = gql`
  mutation UPDATE_USERTECH_MUTATION(
    $id: ID!
    $userId: ID!
    $association: String
    $title: String
    $titleOthers: String
    $phoneOffice: String
  ) {
    updateUserTech(
      id: $id
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

class ProfileEdit extends Component {
  state = {};

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateUserTech = async (e, updateUseTechrMutation, meId, techId) => {
    e.preventDefault();
    const res = await updateUseTechrMutation({
      variables: {
        id: techId,
        userId: meId,
        ...this.state,
      },
    });
  };

  render() {
    const { tech, me } = this.props;
    return (
      <Mutation mutation={UPDATE_USERTECH_MUTATION} variables={this.state}>
        {(updateUserTech, { loading, error }) => (
          <form
            method="post"
            onSubmit={e => {
              this.updateUserTech(e, updateUserTech, me.id, tech.id);
            }}>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <h3>COMPLETA TUS DATOS {tech.id}</h3>
              <Error error={error} />
              <label htmlFor="Association">
                Association
                <select
                  name="association"
                  placeholder="association"
                  value={this.state.association}
                  defaultValue={tech.association}
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
              <label htmlFor="title">
                Título o cargo en la Asociación
                <select
                  name="title"
                  placeholder="title"
                  value={this.state.title}
                  defaultValue={tech.title}
                  onChange={this.saveToState}>
                  <option>Selecciona un Título</option>
                  <option value="PSICOLOGO">PSICOLOGO</option>
                  <option value="TARBAJADOR_SOCIAL">TARBAJADOR SOCIAL</option>
                  <option value="ADMINISTRATIVO">ADMINISTRATIVO</option>
                  <option value="GESTOR">GESTOR</option>
                  <option value="OTROS">OTROS</option>
                </select>
              </label>
              <label htmlFor="titleOthers">
                titleOthers
                <input
                  type="text"
                  name="titleOthers"
                  placeholder="titleOthers"
                  value={this.state.titleOthers}
                  defaultValue={tech.titleOthers}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="phoneOffice">
                phoneOffice
                <input
                  type="text"
                  name="phoneOffice"
                  placeholder="phoneOffice"
                  defaultValue={tech.phoneOffice}
                  value={this.state.phoneOffice}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Gaurdar datos de usuario</button>
            </fieldset>
          </form>
        )}
      </Mutation>
    );
  }
}

export default ProfileEdit;

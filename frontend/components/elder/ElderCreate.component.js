/** @format */

import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../ErrorMessage';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import SINGLE_USERGRANDPA_QUERY from './ElderView.component';

import {
  H3,
  Row,
  Col,
  Form,
  FormGroup,
  FormText,
  Fieldset,
  Legend,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Option,
  Button,
} from '@bootstrap-styled/v4';

const COUNTRIES_QUERY = gql`
  query COUNTRIES_QUERY {
    countries {
      id
      countryName
    }
  }
`;

const PROVINCES_QUERY = gql`
  query COUNTRIES_QUERY {
    provinces {
      id
      name
    }
  }
`;
const All_USERS_TECH = gql`
  query All_USERS_TECH {
    users(where: { typeUser: { typeName: "TECH" } }) {
      id
      name
      lastname
    }
  }
`;

const CREATE_USERGRANDPA_MUTATION = gql`
  mutation CREATE_USERGRANDPA_MUTATION(
    $adress: String
    $birthData: DateTime
    $contactPerson: String
    $country: ID
    $coupleID: [ID]
    $evaluation: ID
    $house: [ID]
    $imageProfile: String
    $interview: [ID]
    $gender: String
    $lastName: String
    $name: String
    $numberDocument: String
    $phone: String
    $province: ID
    $secondLastName: String
    $techResponsible: ID
    $typeDocument: String
  ) {
    createUserGrandpa(
      adress: $adress
      birthData: $birthData
      contactPerson: $contactPerson
      country: $country
      coupleID: $coupleID
      evaluation: $evaluation
      house: $house
      imageProfile: $imageProfile
      interview: $interview
      gender: $gender
      lastName: $lastName
      name: $name
      numberDocument: $numberDocument
      phone: $phone
      province: $province
      secondLastName: $secondLastName
      techResponsible: $techResponsible
      typeDocument: $typeDocument
    ) {
      id
      adress
      association {
        id
      }
      birthData
      contactPerson
      country {
        id
        countryName
      }
      coupleID {
        id
      }
      evaluation {
        id
      }
      house {
        id
      }
      imageProfile
      interview {
        id
      }
      gender
      lastName
      name
      numberDocument
      phone
      province {
        id
      }
      secondLastName
      techResponsible {
        id
        name
        lastname
      }
      typeDocument
    }
  }
`;

class ElderCreate extends Component {
  state = {};
  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { id, action, userGrandpa } = this.props;
    return (
      <>
        <Head>
          <title>Creación de Persona Mayor</title>
        </Head>

        <Row>
          <Mutation
            mutation={CREATE_USERGRANDPA_MUTATION}
            variables={this.state}>
            {(createUserGrandpa, { loading, error }) => (
              <Col xs="12" md="auto" lg="6">
                <Form
                  method="post"
                  onSubmit={async (e) => {
                    // Stop the form from submitting
                    e.preventDefault();
                    // call the mutation
                    const res = await createUserGrandpa();
                    // change them to the single item page
                    Router.push({
                      pathname: '/elder',
                      query: { id: res.data.createUserGrandpa.id },
                    });
                  }}>
                  <Error error={error} />

                  <Fieldset disabled={loading} aria-busy={loading}>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon>Nombre</InputGroupAddon>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Nombre"
                          value={this.state.name}
                          onChange={this.saveToState}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon>Primer Apellido</InputGroupAddon>
                        <Input
                          type="text"
                          name="lastName"
                          placeholder="Primer Apellido"
                          value={this.state.lastName}
                          onChange={this.saveToState}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon>Segundo Apellido</InputGroupAddon>
                        <Input
                          type="text"
                          name="secondLastName"
                          placeholder="Segundo Apellido"
                          value={this.state.secondLastName}
                          onChange={this.saveToState}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon>Típo de Documento</InputGroupAddon>

                        <Input
                          type="select"
                          name="typeDocument"
                          value={this.state.typeDocument}
                          onChange={this.saveToState}>
                          <Option>DNI</Option>
                          <Option>NIE</Option>
                        </Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon>Número de Documento</InputGroupAddon>
                        <Input
                          type="text"
                          name="numberDocument"
                          placeholder="Númoero de Documento de Identificación"
                          value={this.state.numberDocument}
                          onChange={this.saveToState}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon>Teléfono</InputGroupAddon>
                        <Input
                          type="text"
                          name="phone"
                          placeholder="Númoero de Teléfono"
                          value={this.state.phone}
                          onChange={this.saveToState}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon>Género</InputGroupAddon>
                        <Input
                          type="select"
                          name="typeDocument"
                          value={this.state.gender}
                          onChange={this.saveToState}>
                          <Option>FEMALE</Option>
                          <Option>MALE</Option>
                          <Option>NO_GENDER</Option>
                        </Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon>Dirección</InputGroupAddon>
                        <Input
                          type="text"
                          name="adress"
                          placeholder="Dirección completa"
                          value={this.state.adress}
                          onChange={this.saveToState}
                        />
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon>Provincia</InputGroupAddon>
                        <Input
                          type="select"
                          name="province"
                          placeholder="Povincia"
                          value={this.state.province}
                          onChange={this.saveToState}>
                          <Query query={PROVINCES_QUERY}>
                            {({ data, loading, error }) => {
                              if (loading) return <option>loading...</option>;
                              if (error) return <Error error={error} />;
                              return data.provinces.map((i) => (
                                <Option key={i.id} value={i.id}>
                                  {i.name}
                                </Option>
                              ));
                            }}
                          </Query>
                        </Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon>País</InputGroupAddon>
                        <Input
                          type="select"
                          name="country"
                          placeholder="País"
                          value={this.state.country}
                          onChange={this.saveToState}>
                          <Query query={COUNTRIES_QUERY}>
                            {({ data, loading, error }) => {
                              if (loading) return <option>loading...</option>;
                              if (error) return <Error error={error} />;
                              return data.countries.map((i) => (
                                <Option key={i.id} value={i.id}>
                                  {i.countryName}
                                </Option>
                              ));
                            }}
                          </Query>
                        </Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon>Técnico responsable</InputGroupAddon>
                        <Input
                          type="select"
                          name="techResponsible"
                          placeholder="Técnico Responsable"
                          value={this.state.techResponsible}
                          onChange={this.saveToState}>
                          <Query query={All_USERS_TECH}>
                            {({ data, loading, error }) => {
                              if (loading) return <option>loading...</option>;
                              if (error) return <Error error={error} />;
                              if (!data.users) return <p>No Item Found for </p>;
                              return data.users.map((i) => (
                                <Option key={i.id} value={i.id}>
                                  {i.name} {i.lastname}
                                </Option>
                              ));
                            }}
                          </Query>
                        </Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup>
                        <InputGroupAddon>Persona de Contacto</InputGroupAddon>
                        <Input
                          type="text"
                          name="contactPerson"
                          placeholder="Nombre persona de contacto"
                          value={this.state.contactPerson}
                          onChange={this.saveToState}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <Col sm={{ size: 10, offset: 2 }}>
                        <Button color="success" type="submit">
                          Salvar modificaciones
                        </Button>
                      </Col>
                    </FormGroup>
                  </Fieldset>
                </Form>
              </Col>
            )}
          </Mutation>
        </Row>
      </>
    );
  }
}

export default ElderCreate;

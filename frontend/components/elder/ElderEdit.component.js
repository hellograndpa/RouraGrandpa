/** @format */

import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../ErrorMessage';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router';
import SINGLE_USERGRANDPA_QUERY from './ElderView.component';

//style
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

const UPDATE_USERGRANDPA_MUTATION = gql`
  mutation UPDATE_USERGRANDPA_MUTATION(
    $id: ID!
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
    updateUserGrandpa(
      id: $id
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

class ElderEdit extends Component {
  state = {
    province: this.props.userGrandpa.province.id,
    country: this.props.userGrandpa.country.id,
    techResponsible: this.props.userGrandpa.techResponsible.id,
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateUserGrandpa = async (e, updateUserGrandpaMutation, id) => {
    e.preventDefault();
    const res = await updateUserGrandpaMutation({
      variables: {
        id,
        ...this.state,
      },
    });
  };

  render() {
    const { id, action, userGrandpa } = this.props;
    return (
      <>
        <Head>
          <title>Edición de Persona Mayor</title>
        </Head>
        <Row>
          <Col xs="12" md="auto" lg="6">
            <H3> EDICIÓN DE USUARIO MAYOR</H3>
          </Col>
          <Col className="my-2 my-lg-0">
            <Button className="mr-sm-2" href="javascript:;" color="info">
              Crear pareja
            </Button>
            <Button className="mr-sm-2" onClick={action} color="warning">
              Modificar
            </Button>
            <Button className="mr-sm-2" href="javascript:;" color="danger">
              Dar de baja
            </Button>
          </Col>
        </Row>
        <Row>
          <Mutation
            mutation={UPDATE_USERGRANDPA_MUTATION}
            variables={this.state}>
            {(updateUserGrandpa, { loading, error }) => (
              <Col xs="12" md="auto" lg="6">
                <Form
                  method="post"
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.updateUserGrandpa(e, updateUserGrandpa, id);
                    action();
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
                          defaultValue={userGrandpa.name}
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
                          defaultValue={userGrandpa.lastName}
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
                          defaultValue={userGrandpa.secondLastName}
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
                          defaultValue={userGrandpa.typeDocument}
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
                          defaultValue={userGrandpa.numberDocument}
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
                          defaultValue={userGrandpa.phone}
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
                          defaultValue={userGrandpa.gender}
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
                          defaultValue={userGrandpa.adress}
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
                          defaultValue={userGrandpa.prvince}
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
                          defaultValue={userGrandpa.country}
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
                          defaultValue={userGrandpa.techResponsible}
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
                          defaultValue={userGrandpa.contactPerson}
                          onChange={this.saveToState}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup check row>
                      <Col sm={{ size: 10, offset: 2 }}>
                        <Button type="submit">Submit</Button>
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

export default ElderEdit;

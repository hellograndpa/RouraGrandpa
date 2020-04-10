/** @format */

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../ErrorMessage';
import Link from 'next/link';
import Head from 'next/head';

//style
import {
  H2,
  H3,
  H4,
  H5,
  Hr,
  Button,
  Col,
  Row,
  Header,
  Ul,
  Li,
  Address,
  Strong,
  P,
  Details,
  Summary,
  Navbar,
  NavbarBrand,
  Nav,
  A,
} from '@bootstrap-styled/v4';

const SINGLE_USERGRANDPA_QUERY = gql`
  query SINGLE_USERGRANDPA_QUERY($id: ID!) {
    userGrandpa(where: { id: $id }) {
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
        name
      }
      secondLastName
      techResponsible {
        id
        name
        lastname
      }
      typeDocument
      createDate
      updateDate
    }
  }
`;
class ElderView extends Component {
  render() {
    const { id, action } = this.props;
    return (
      <Query
        query={SINGLE_USERGRANDPA_QUERY}
        variables={{
          id: this.props.id,
        }}>
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.userGrandpa)
            return <p>No Item Found for {this.props.id} </p>;
          const {
            adress,
            association,
            birthData,
            contactPerson,
            country,
            coupleID,
            evaluation,
            house,
            imageProfile,
            interview,
            gender,
            lastName,
            name,
            numberDocument,
            phone,
            province,
            secondLastName,
            techResponsible,
            typeDocument,
            createDate,
            updateDate,
          } = data.userGrandpa;
          return (
            <>
              <Head>
                <title>
                  PB | {name} {lastName}
                </title>
              </Head>
              <Row>
                <Col xs="12" md="auto" lg="6">
                  <H3>USUARIO PERSONA MAYOR</H3>
                </Col>
                <Col className="my-2 my-lg-0">
                  <Button className="mr-sm-2" href="javascript:;" color="info">
                    Crear pareja
                  </Button>
                  <Button className="mr-sm-2" onClick={action} color="warning">
                    Modificar
                  </Button>
                  <Button
                    className="mr-sm-2"
                    href="javascript:;"
                    color="danger">
                    Dar de baja
                  </Button>
                </Col>
              </Row>
              <Row>
                {/* USER DATA */}
                <Col xs="12" md="auto" lg="6">
                  <H3>
                    {name} {lastName} {secondLastName}
                  </H3>
                  <Ul inline>
                    <Li>
                      <H5>
                        {typeDocument}: {numberDocument}
                      </H5>
                    </Li>
                    <Li>
                      <H5>Teléfono: {phone}</H5>
                    </Li>
                    <Li>
                      <H5>Género: {gender}</H5>
                    </Li>
                    <Li>
                      <Address>
                        <Strong>Direccion:</Strong> {adress}
                        <P>
                          <Strong>Provincia: </Strong>
                          {province.name} <Strong>País: </Strong>
                          {country.countryName}
                        </P>
                      </Address>
                    </Li>
                  </Ul>
                  <Hr />
                  <Details>
                    <Summary>PERSONA DE CONTACTO</Summary>
                    <P>
                      <Ul inline>
                        <Li>
                          <Strong>NOBRE: </Strong> {contactPerson}
                        </Li>
                        <Li>
                          <Strong>Teléfono: </Strong>
                          {phone}
                        </Li>
                        <Li>
                          <Address>
                            <Strong>Direccion:</Strong> {adress}
                            <P>
                              <Strong>Provincia: </Strong>
                              {province.name} <Strong>País: </Strong>
                              {country.countryName}
                            </P>
                          </Address>
                        </Li>
                      </Ul>
                    </P>
                  </Details>
                  <Hr />
                  <P>
                    <H5>DERIVADO POR: Servicios sociales </H5>
                  </P>
                  <Hr />
                  <P>
                    <H5>APERTURA DE FICHA</H5>
                    <Ul inline>
                      <Li>
                        <Strong>FECHA DE ALTA: </Strong> {createDate}
                      </Li>
                      <Li>
                        <Strong>TÉCNICO RESPONSABLE: </Strong>{' '}
                        {techResponsible.name} {techResponsible.lastname}
                      </Li>
                    </Ul>
                  </P>
                  <Hr />
                  <P>
                    <H5>VALORACIONES</H5>
                  </P>
                  <Hr />
                  <P>
                    <H5>ENTREVISTA</H5>
                  </P>
                  <Hr />
                  <P>
                    <H5>NOTAS Y OBSERVACINES</H5>
                  </P>
                  <Hr />
                </Col>
                {/* HOUSE DATA */}
                <Col xs="12" md="auto" lg="6">
                  <H3>CASA</H3>
                </Col>
              </Row>
            </>
          );
        }}
      </Query>
    );
  }
}

export default ElderView;
export { SINGLE_USERGRANDPA_QUERY };

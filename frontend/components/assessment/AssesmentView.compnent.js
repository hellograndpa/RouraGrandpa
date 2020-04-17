/** @format */

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from '../ErrorMessage';

import PaginationAssessment from './PaginationAssessment';

import { Col, Row, P } from '@bootstrap-styled/v4';

const EVALUATION_USERGRANDPA_QUERY = gql`
  query EVALUATION_USERGRANDPA_QUERY($id: ID, $skip: Int = 0, $first: Int = 1) {
    evaluationGrandpas(
      where: { userGrandpa: { id: $id } }
      skip: $skip
      first: $first
    ) {
      id
      user {
        id
        name
        lastname
      }
      userGrandpa {
        id
        name
        lastName
      }
      evaluation_01
      evaluation_02
      evaluation_03
      evaluation_04
      evaluation_05
      evaluation_06
      evaluation_07
      evaluation_08
      evaluation_09
      evaluation_10
      description
      createDate
      updateDate
    }
  }
`;

export class AssessmentView extends Component {
  render() {
    const { id, assessment } = this.props;
    return (
      <div>
        <P>
          <PaginationAssessment id={id} assessment={assessment} />
        </P>
        <Query
          query={EVALUATION_USERGRANDPA_QUERY}
          variables={{
            id,
            skip: assessment - 1,
            first: 1,
            orderBy: 'updateDate_DESC'
          }}>
          {({ data, loading, error }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading...</p>;
            if (!data.evaluationGrandpas) {
              return <p>AssessmentView no sale {this.props.id} </p>;
            }

            return (
              <p>
                {data.evaluationGrandpas.map(element => {
                  const {
                    evaluation_01,
                    evaluation_02,
                    evaluation_03,
                    evaluation_04,
                    evaluation_05,
                    evaluation_06,
                    evaluation_07,
                    evaluation_08,
                    evaluation_09,
                    evaluation_10,
                    user,
                    userGrandpa,
                    description,
                    createDate,
                    updateDate
                  } = element;
                  return (
                    <>
                      <P>
                        Valoración hecha: {createDate}y actualizada:{' '}
                        {updateDate}
                      </P>
                      <P>
                        Técnico responsable: {user.name} {user.lastname}
                      </P>

                      <Row>
                        <Col xs="6" md="auto" lg="4">
                          Elemento 01: {evaluation_01}
                        </Col>
                        <Col xs="6" md="auto" lg="4">
                          Elemento 02: {evaluation_02}
                        </Col>
                        <Col xs="6" md="auto" lg="4">
                          Elemento 03: {evaluation_03}
                        </Col>
                        <Col xs="6" md="auto" lg="4">
                          Elemento 04: {evaluation_04}
                        </Col>
                        <Col xs="6" md="auto" lg="4">
                          Elemento 05: {evaluation_05}
                        </Col>
                        <Col xs="6" md="auto" lg="4">
                          Elemento 06: {evaluation_06}
                        </Col>
                        <Col xs="6" md="auto" lg="4">
                          Elemento 07: {evaluation_07}
                        </Col>
                        <Col xs="6" md="auto" lg="4">
                          Elemento 08: {evaluation_08}
                        </Col>
                        <Col xs="6" md="auto" lg="4">
                          Elemento 09: {evaluation_09}
                        </Col>
                        <Col xs="6" md="auto" lg="4">
                          Elemento 10: {evaluation_10}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="12" md="auto" lg="12">
                          Descriptivo: {description}
                        </Col>
                      </Row>
                    </>
                  );
                })}
              </p>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default AssessmentView;

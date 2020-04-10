/** @format */

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PaginationComponent from './Pagination.component';
import { perPage } from '../../config';
import Link from 'next/link';

import {
  Card,
  CardImg,
  CardBlock,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Col,
  Row,
  Header,
  Nav,
  NavItem,
  NavLink,
  Form,
  Input,
} from '@bootstrap-styled/v4';

const ALL_USERGRANPA_QUERY = gql`
  query ALL_USERGRANPA_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    userGrandpas(first: $first, skip: $skip, orderBy: createDate_DESC) {
      id
      name
      lastName
      phone
      adress
    }
  }
`;

class Elders extends Component {
  render() {
    return (
      <div>
        <h2>Hay "N" Personas Mayores </h2>

        <Header className="d-flex justify-content-between pb-2">
          <PaginationComponent page={this.props.page} />
          <Nav pills>
            <NavItem>
              <NavLink href="javascript:;">Crear un Nuevo usuario</NavLink>
            </NavItem>
            <NavItem>
              <Form inline className="my-2 my-lg-0">
                <Input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                />
                <Button href="/" color="success">
                  Search
                </Button>
              </Form>
            </NavItem>
          </Nav>
        </Header>
        <Query
          query={ALL_USERGRANPA_QUERY}
          fetchPolicy="network-only"
          variables={{
            skip: this.props.page * perPage - perPage,
            first: perPage,
          }}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p> Error: {error.message}</p>;

            return (
              <Row>
                {data.userGrandpas.map((user, index) => {
                  const { id, name, lastName, phone, adress } = user;
                  return (
                    <Col lg="3" md="4" xs="6" kewy={id}>
                      <Card>
                        <CardImg
                          top
                          src="https://img.favpng.com/16/6/21/grandparent-grandfather-grandpa-grandpa-clip-art-png-favpng-1WBdNQE8v2LE3mcDkhqtFPAVS.jpg?txtsize=33&txt=318%C3%97180&w=318&h=180"
                          alt="Card image cap"
                          height="200px"
                        />
                        <CardBlock>
                          <CardTitle>
                            {name} {lastName}
                          </CardTitle>
                          <CardSubtitle>
                            <p>{adress}</p>
                            <p>Telf: {phone}</p>
                          </CardSubtitle>
                          {/* <CardText>
                            Some quick example text to build on the card title
                            and make up the bulk of the Card content.
                          </CardText> */}
                          <Button color="primary">
                            <Link
                              href={{
                                pathname: '/elder',
                                query: { id: id },
                              }}>
                              <a> Ir ficha </a>
                            </Link>
                          </Button>
                        </CardBlock>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            );
          }}
        </Query>
        <PaginationComponent page={this.props.page} />
      </div>
    );
  }
}

export default Elders;

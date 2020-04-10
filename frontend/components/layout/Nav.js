/** @format */
import React, { Component } from 'react';
import Link from 'next/link';
import User from '../meUser/UserMe.component';

import {
  A,
  Form,
  Input,
  Button,
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Row,
} from '@bootstrap-styled/v4';

class Navigation extends Component {
  state = {
    isOpen: false,
  };
  render() {
    return (
      <Navbar color="faded" light toggleable="md">
        <Container>
          <div className="d-flex justify-content-between">
            <NavbarBrand tag={A} to="/">
              GRANDPA
            </NavbarBrand>
            <NavbarToggler
              onClick={() => this.setState({ isOpen: !this.state.isOpen })}
            />
          </div>
          <Collapse navbar isOpen={this.state.isOpen}>
            <Nav navbar className="mr-auto">
              <NavItem>
                <Link href="/users">
                  <a>USERSs</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/elders">
                  <a>GRANDPAS </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/profile">
                  <a>MI PERFIL</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/signup">
                  <a>SIGNUP</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/">
                  <a>HOME</a>
                </Link>
              </NavItem>
            </Nav>
            <User>
              {({ data: { me } }) => {
                if (me)
                  return (
                    <p>
                      Name: {me.name} || T: {me.typeUser.typeName}
                    </p>
                  );
                return null;
              }}
            </User>
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
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;

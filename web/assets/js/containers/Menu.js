import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

import login from '../login';

export class Menu extends Component {
  render() {
    return (
      <Navbar fluid fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Application</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem href="#">Menu item 1</NavItem>
          </Nav>
            {
              this.props.user ?
                <Nav pullRight>
                  <NavItem onClick={this.props.onLogout}>Logout ({this.props.user})</NavItem>
                </Nav>
                :
                <Nav pullRight>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <NavItem>Register</NavItem>
                  </LinkContainer>
                </Nav>
            }
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
Menu.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.string,
};

function mapStateToProps(state) {
  const user = state.login.user ? state.login.user.username : '';

  return { user };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogout(e) {
      e.preventDefault();

      dispatch(login.actions.logout());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

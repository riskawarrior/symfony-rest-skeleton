import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Col, FormGroup, FormControl, Button, Glyphicon, Alert } from 'react-bootstrap';

import { register } from '../actions';
import { NAME } from '../constants';


let username, password;

export class Register extends Component {
  render() {
    return (
      <div>
        <Col xsHidden md={4} />
        <Col xs={12} md={4}>
          <h1 className="text-center">Register</h1>
          {this.props.invalid ? <Alert bsStyle="danger">{this.props.invalid}</Alert> : null}
          <form onSubmit={this.props.onSubmit}>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Username"
                onChange={(val) => {
                  username = val.target.value;
                }}
              />
            </FormGroup>
            <FormGroup>
              <FormControl
                type="password"
                placeholder="Password"
                onChange={(val) => {
                  password = val.target.value;
                }}
              />
            </FormGroup>
            <Button type="submit" bsStyle="primary" className="pull-right">
              Register {this.props.fetching ? <Glyphicon glyph="refresh" className="glyphicon-refresh-animate" /> : null}
            </Button>
          </form>
        </Col>
        <Col xsHidden md={4} />
      </div>
    );
  }
}
Register.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return { ...state[NAME].register };
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit(e) {
      e.preventDefault();

      dispatch(register(username, password));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

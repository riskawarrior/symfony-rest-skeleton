import expect from 'expect';

import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from './../../../containers/Menu';

function setup(args) {
  const props = {
    onLogout: jest.fn(),
    ...args,
  };

  const enzymeWrapper = shallow(<Menu {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('containers', () => {
  describe('Logout', () => {
    it('should render not logged in state', () => {
      const { enzymeWrapper } = setup({
        user: null,
      });

      const logo = enzymeWrapper.find('NavbarBrand').find('Link');
      expect(logo.children().text()).toBe('Application');
      expect(logo.prop('to')).toBe('/');

      const navItems = enzymeWrapper.find('Nav[pullRight=true]').find('NavItem');
      expect(navItems.at(0).children().text()).toBe('Login');
      expect(navItems.at(0).parent().prop('to')).toBe('/login');
      expect(navItems.at(1).children().text()).toBe('Register');
      expect(navItems.at(1).parent().prop('to')).toBe('/register');
    });

    it('should render logged in state', () => {
      const { enzymeWrapper, props } = setup({
        user: 'bela',
      });

      const logout = enzymeWrapper.find('Nav[pullRight=true]').find('NavItem');
      expect(logout.children().map(node => node.text()).join('')).toBe('Logout (bela)');
      logout.props().onClick(null);
      expect(props.onLogout.mock.calls.length).toBe(1);
    });
  });
});

import expect from 'expect';

import React from 'react';
import { shallow } from 'enzyme';
import { Register } from './../../../../register/containers/Register';

function setup(args) {
  const props = {
    onSubmit: jest.fn(),
    ...args,
  };

  const enzymeWrapper = shallow(<Register {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('containers', () => {
  describe('Register', () => {
    it('should render self and subcomponents in default state', () => {
      const { enzymeWrapper } = setup({
        fetching: false,
        invalid: '',
      });

      expect(enzymeWrapper.find('h1').hasClass('text-center')).toBe(true);
      expect(enzymeWrapper.find('h1').text()).toBe('Register');

      expect(enzymeWrapper.find('Alert').exists()).toBe(false);
      expect(enzymeWrapper.find('Glyphicon').exists()).toBe(false);
    });

    it('should render self and subcomponents in error', () => {
      const { enzymeWrapper } = setup({
        fetching: false,
        invalid: 'Invalid',
      });

      expect(enzymeWrapper.find('Alert').exists()).toBe(true);
      expect(enzymeWrapper.find('Alert').children().text()).toBe('Invalid');
      expect(enzymeWrapper.find('Glyphicon').exists()).toBe(false);
    });

    it('should render self and subcomponents during loading', () => {
      const { enzymeWrapper } = setup({
        fetching: true,
        invalid: '',
      });

      expect(enzymeWrapper.find('Alert').exists()).toBe(false);
      expect(enzymeWrapper.find('Glyphicon').exists()).toBe(true);
    });

    it('triggers the login event', () => {
      const { enzymeWrapper, props } = setup({
        fetching: true,
        invalid: '',
      });

      enzymeWrapper.find('form').props().onSubmit(null);
      expect(props.onSubmit.mock.calls.length).toBe(1);
    });
  });
});

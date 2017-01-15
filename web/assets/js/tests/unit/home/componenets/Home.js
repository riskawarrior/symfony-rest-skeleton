import expect from 'expect';

import React from 'react';
import { shallow } from 'enzyme';
import Home from './../../../../home/components/Home';

function setup() {
  const enzymeWrapper = shallow(<Home />);

  return {
    enzymeWrapper,
  };
}

describe('componenets', () => {
  describe('Home', () => {
    it('shows Home', () => {
      const { enzymeWrapper } = setup();

      expect(enzymeWrapper.find('h1').text()).toBe('Home');
    });
  });
});

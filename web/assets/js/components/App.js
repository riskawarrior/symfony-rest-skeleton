import React from 'react';

import { Menu } from '../containers';


export default function App({ children }) {
  return (
    <div>
      <Menu />
      <div className="container-fluid">
        {children}
      </div>
    </div>
  );
}
App.propTypes = {
  children: React.PropTypes.node,
};

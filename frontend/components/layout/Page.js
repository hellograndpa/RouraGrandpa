/** @format */

import React, { Component } from 'react';
import Header from './Header';
import Meta from './Meta';
import BootstrapProvider from '@bootstrap-styled/provider';
import myTheme from '../../theme/theme';

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <BootstrapProvider theme={myTheme}>
          <Header />
          {this.props.children}
        </BootstrapProvider>
      </div>
    );
  }
}

export default Page;

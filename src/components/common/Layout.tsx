import { Box } from '@material-ui/core';
import React from 'react';
import Navbar from '../Navbar';

export default class Layout extends React.Component {
  render(): JSX.Element {
    return (
      <>
        <Navbar />

        <Box component="main">{this.props.children}</Box>
      </>
    );
  }
}

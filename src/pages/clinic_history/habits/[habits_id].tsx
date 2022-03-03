import React from 'react';

/// MUI COMPONENTS
import { Container } from '@material-ui/core';
/// MUI COMPONENTS END

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const HabitsDetail = () => {
  return (
    <Container>
      <h3>Control de hábitos detalle</h3>
    </Container>
  );
};

HabitsDetail.getInitialProps = async () => {
  return [];
};
export default HabitsDetail;

import React from 'react';

/// MUI COMPONENTS
import { Container } from '@material-ui/core';
/// MUI COMPONENTS END

const HabitsDetail = (): JSX.Element => {
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

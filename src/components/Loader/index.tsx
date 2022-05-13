import {Container} from './styles';
import {Spinner} from '@ui-kitten/components';
import React from 'react';

const Loader = () => {
  return (
    <Container>
      <Spinner size="large" animating={true} />
    </Container>
  );
};

export default Loader;

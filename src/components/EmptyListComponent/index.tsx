import React from 'react';
import {StyleSheet} from 'react-native';

import {Container, Label} from './styles';
import {NoDataIllustration} from 'assets';

const styles = StyleSheet.create({
  container: {
    marginVertical: 100,
  },
});

const EmptyListComponent = () => {
  return (
    <Container>
      <NoDataIllustration height={150} width={150} style={styles.container} />
      <Label>No tasks to show</Label>
    </Container>
  );
};

export default EmptyListComponent;

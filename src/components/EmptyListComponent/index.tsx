import React from 'react';
import {Container, Label} from './styles';
import {NoDataIllustration} from 'assets/index';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginVertical: 100,
  },
});

const EmptyListComponent = () => {
  return (
    <Container>
      <NoDataIllustration height={200} width={200} style={styles.container} />
      <Label>No tasks to show</Label>
    </Container>
  );
};

export default EmptyListComponent;

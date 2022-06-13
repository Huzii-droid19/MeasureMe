import React from 'react';
import {Container, Label} from './styles';
import {NoDataIllustration} from 'assets/index';
import {StyleProp, ViewStyle} from 'react-native';

const style = {
  marginVertical: 100,
} as StyleProp<ViewStyle>;

const EmptyListComponent = () => {
  return (
    <Container>
      <NoDataIllustration height={200} width={200} style={style} />
      <Label>No tasks to show</Label>
    </Container>
  );
};

export default EmptyListComponent;

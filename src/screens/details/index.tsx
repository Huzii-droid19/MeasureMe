import React from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Container, Error, Info, Label, InputContainer} from './styles';

const Details = ({navigation, route}: NativeStackScreenProps<any>) => {
  return (
    <ScreenWrapper>
      <Container>
        <Label category="label">Deta</Label>
      </Container>
    </ScreenWrapper>
  );
};

export default Details;

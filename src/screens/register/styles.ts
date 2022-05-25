import styled from 'styled-components/native';
import {Button, Text, Layout} from '@ui-kitten/components';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const Container = styled(Layout)({
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});
export const Label = styled(Text)({
  fontSize: 30,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 20,
});
export const InputContainer = styled(Layout)({
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'center',
  width: width * 0.9,
});
export const Error = styled(Text)({
  fontSize: 12,
  fontWeight: 400,
});
export const SubmitButton = styled(Button)({
  width: width * 0.5,
  marginTop: 20,
});
export const Info = styled(Layout)({
  marginTop: 20,
});

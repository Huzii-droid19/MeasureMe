import styled from 'styled-components/native';
import {Layout, Text} from '@ui-kitten/components';

export const Container = styled(Layout)({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
export const Label = styled(Text)({
  marginTop: 10,
  marginBottom: 20,
  fontSize: 25,
  fontWeight: 'bold',
});
export const InputContainer = styled(Layout)({
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'center',
  width: '90%',
});
export const Error = styled(Text)({
  fontSize: 12,
  fontWeight: 600,
  color: 'red',
});
export const Info = styled(Layout)({
  marginTop: 20,
});

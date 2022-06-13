import styled from 'styled-components/native';
import {Text, Layout} from '@ui-kitten/components';

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
  width: '100%',
});
export const Error = styled(Text)({
  fontSize: 12,
  fontWeight: 400,
});
export const ButtonContainer = styled(Layout)({
  marginTop: 20,
});

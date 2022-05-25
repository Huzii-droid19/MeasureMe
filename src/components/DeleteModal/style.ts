import styled from 'styled-components/native';
import {Layout, Text} from '@ui-kitten/components';

export const Container = styled(Layout)({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
export const ButtonContainer = styled(Layout)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
});
export const DeleteText = styled(Text)({
  fontSize: 20,
  fontWeight: 700,
  textAlign: 'center',
});

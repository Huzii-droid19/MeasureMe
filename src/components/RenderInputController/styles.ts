import styled from 'styled-components/native';
import {Input, Text} from '@ui-kitten/components';

export const StyledInput = styled(Input)({
  width: '100%',
  marginBottom: 10,
  textAlign: 'justify',
  border: 'none',
  borderBottomWidth: 1,
  borderBottomColor: 'lightgray',
  backgroundColor: 'transparent',
});
export const InputLabel = styled(Text)({
  fontSize: 15,
  fontWeight: 500,
  marginBottom: 5,
});

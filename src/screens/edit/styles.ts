import styled from 'styled-components/native';
import {Icon, Layout, Text} from '@ui-kitten/components';

export const Container = styled(Layout)({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
});
export const InputContainer = styled(Layout)({
  flexDirection: 'column',
  width: '100%',
});
export const Error = styled(Text)({
  fontSize: 12,
  fontWeight: 600,
  color: 'red',
});
export const StyledIcon = styled(Icon)({
  height: 20,
  width: 20,
});

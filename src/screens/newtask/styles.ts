import styled from 'styled-components/native';
import {CheckBox, Icon, Layout, Text} from '@ui-kitten/components';

export const Container = styled(Layout)({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
});
export const Label = styled(Text)({
  marginTop: 10,
  marginBottom: 20,
  fontSize: 25,
  fontWeight: 'bold',
});
export const InputContainer = styled(Layout)({
  flexDirection: 'column',
  width: '100%',
});
export const Error = styled(Text)({
  fontSize: 12,
  fontWeight: 600,
  color: 'red',
  marginLeft: 20,
});
export const StyledCheckBox = styled(CheckBox)({
  alignSelf: 'flex-start',
  marginTop: 10,
  marginBottom: 20,
  marginHorizontal: 20,
});
export const CheckBoxLabel = styled(Text)({
  fontSize: 16,
  fontWeight: 'bold',
});
export const StyledIcon = styled(Icon)(({theme}) => ({
  height: 20,
  width: 20,
}));

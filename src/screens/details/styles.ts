import styled from 'styled-components/native';
import {Layout, Text, Icon} from '@ui-kitten/components';

export const Container = styled(Layout)({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: 3,
});

export const Title = styled(Text)({
  marginBottom: 20,
  fontSize: 25,
  fontWeight: 'bold',
});
export const ButtonContainer = styled(Layout)({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  marginTop: 30,
  alignItems: 'center',
});
export const Error = styled(Text)({
  fontSize: 12,
  fontWeight: 600,
  color: 'red',
});

export const Info = styled(Layout)({
  marginTop: 10,
});
export const Deadline = styled(Text)({
  fontSize: 15,
  fontWeight: 600,
});
export const Description = styled(Text)({
  fontSize: 20,
  fontWeight: 600,
  marginTop: 30,
  textAlign: 'justify',
});
export const UndoWrapper = styled(Layout)({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});
export const UndoText = styled(Text)({
  fontSize: 15,
  fontWeight: 700,
  marginTop: 30,
  textAlign: 'justify',
});
export const IconWrapper = styled.TouchableOpacity({
  marginLeft: 20,
});
export const StyledIcon = styled(Icon)({
  height: 25,
  width: 25,
});

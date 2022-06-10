import styled from 'styled-components/native';
import {Layout, Text, Icon, Button} from '@ui-kitten/components';

export const Container = styled(Layout)({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: 35,
});
export const Wrapper = styled(Layout)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
});

export const Title = styled(Text)({
  marginBottom: 20,
  fontSize: 25,
  fontWeight: 'bold',
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
export const IconWrapper = styled.TouchableOpacity({
  marginLeft: 20,
});
export const StyledIcon = styled(Icon)({
  height: 25,
  width: 25,
});

export const JoinMeetingButton = styled(Button)({
  marginTop: 30,
  width: '100%',
  alignSelf: 'center',
});

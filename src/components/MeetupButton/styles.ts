import {Icon, Text} from '@ui-kitten/components';
import styled from 'styled-components/native';
import {Image} from 'react-native';

export const StyledIcon = styled(Icon)({
  height: 20,
  width: 20,
});
export const AddMeetupButton = styled.TouchableOpacity({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
  alignSelf: 'flex-start',
  width: '100%',
  height: 60,
  borderBottomWidth: 1,
  borderBottomColor: 'lightgray',
  paddingHorizontal: 20,
});
export const MeetLabel = styled(Text)(({theme}) => ({
  fontSize: 16,
  fontWeight: 'normal',
  marginLeft: 20,
}));
export const IconContainer = styled.TouchableOpacity({
  marginHorizontal: 100,
});
export const StyledImageIcon = styled(Image)({
  height: 20,
  width: 20,
});

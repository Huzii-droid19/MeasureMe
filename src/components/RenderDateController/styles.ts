import styled from 'styled-components/native';
import {Calendar, Card, Icon, Modal, Text} from '@ui-kitten/components';

export const Container = styled.TouchableOpacity({
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 15,
  alignSelf: 'flex-start',
  width: '100%',
  height: 60,
  borderBottomWidth: 1,
  borderBottomColor: 'lightgray',
  paddingHorizontal: 20,
});
export const Label = styled(Text)(({theme}) => ({
  fontSize: 16,
  fontWeight: 'normal',
  marginLeft: 20,
}));

export const StyledModal = styled(Modal)({
  width: '85%',
  height: '60%',
});
export const StyledCard = styled(Card)({
  height: '90%',
});
export const StyledCalendar = styled(Calendar)({
  width: '100%',
  border: 'none',
});
export const DateLabel = styled(Text)({
  fontSize: 23,
  fontWeight: 700,
  marginVertical: 15,
});
export const StyledIcon = styled(Icon)({
  height: 20,
  width: 20,
});

import styled from 'styled-components/native';
import {Icon, Layout, Text} from '@ui-kitten/components';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Container = styled(Layout)(({theme}) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  alignSelf: 'flex-start',
  paddingHorizontal: 25,
  height: height * 0.1,
  width: width,
  elevation: '5',
  backgroundColor: theme['color-header'],
}));
export const MonthWrapper = styled.TouchableOpacity(() => ({
  flex: 0.5,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 4,
  margin: 5,
  height: height * 0.9,
  borderRadius: 10,
}));
export const Month = styled(Text)({
  fontSize: 20,
  fontWeight: 700,
  textAlign: 'center',
  marginRight: 10,
});
export const StyledIcon = styled(Icon)({
  height: 25,
  width: 25,
});

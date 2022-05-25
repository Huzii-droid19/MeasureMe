import styled from 'styled-components/native';
import {Icon, Input, Layout, Text, ThemeType} from '@ui-kitten/components';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

interface ContainerProps {
  theme: ThemeType;
}

export const Container = styled(Layout)(({theme}: ContainerProps) => ({
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
export const InputField = styled(Input)({
  width: width * 0.8,
  height: height * 0.05,
  borderRadius: 5,
  paddingHorizontal: 10,
});

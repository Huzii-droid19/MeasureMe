import styled from 'styled-components/native';
import {FlatList, Animated, Dimensions} from 'react-native';
import {Icon, Layout, Button} from '@ui-kitten/components';
import {Calendar} from 'react-native-calendars';

const {width} = Dimensions.get('window');

export const Container = styled(Layout)({
  flex: 1,
});

export const CalendarView = styled(Animated.View)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: width,
  position: 'absolute',
  left: 0,
  right: 0,
  zIndex: 1,
});
export const StyledIcon = styled(Icon)({
  height: 25,
  width: 25,
});

export const TaskCalendar = styled(Calendar)({
  width: width,
});
export const TaskList = styled(FlatList)({
  paddingTop: 10,
  paddingBottom: 20,
});
export const FloatingButton = styled(Button)({
  alignSelf: 'flex-end',
  postion: 'absolute',
  bottom: 25,
  right: 25,
  width: 50,
  height: 50,
  borderRadius: 25,
  elevation: '10',
});

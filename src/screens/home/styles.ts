import styled from 'styled-components/native';
import {Dimensions, FlatList} from 'react-native';
import {Animated} from 'react-native';
import {Icon, Layout, Button} from '@ui-kitten/components';
import {Calendar} from 'react-native-calendars';

const {width} = Dimensions.get('window');

export const Container = styled(Layout)`
  flex: 1;
`;
export const CalendarView = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${width}px;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;
`;
export const StyledIcon = styled(Icon)`
  height: 25px;
  width: 25px;
`;

export const TaskCalendar = styled(Calendar)`
  width: ${width}px;
`;

export const TaskList = styled(FlatList)`
  padding-top: 10px;
  padding-bottom: 20px;
`;
export const FloatingButton = styled(Button)`
  position: absolute;
  bottom: 25px;
  right: 25px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  elevation: 5;
`;

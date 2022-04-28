import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {Colors} from '../../constants/colors';
import {Animated} from 'react-native';
import {Input, Calendar} from '@ui-kitten/components';

const {width, height} = Dimensions.get('window');
export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: ${Colors.primary};
`;
export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: flex-start;
  padding-horizontal: 25px;
  height: 10%;
  width: ${width}px;
  height: ${height * 0.1}px;
  elevation: 5;
  background-color: ${Colors.header};
`;
export const MonthView = styled.TouchableOpacity`
  flex: 0.4;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 4px;
  width: 35%;
  height: 100%;
`;
export const Month = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #1b1a17;
  text-align: center;
`;
export const CalendarView = styled(Animated.View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${width}px;
`;
export const ListContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${width}px;
  height: ${height}px;
  margin-horizontal: 25px;
`;
export const InputView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const InputField = styled(Input)`
  width: ${width * 0.8}px;
  height: ${height * 0.05}px;
  border-radius: 5px;
  padding-horizontal: 10px;
`;

export const TaskCalendar = styled(Calendar)`
  width: ${width}px;
  background-color: ${Colors.header};
`;

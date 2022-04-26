import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {Colors} from '../../constants/colors';

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
  elevation: 1;
  background-color: ${Colors.header};
`;
export const MonthView = styled.TouchableOpacity`
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
export const CalendarView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${width}px;
`;

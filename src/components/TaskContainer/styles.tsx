import styled from 'styled-components';
import {Dimensions} from 'react-native';
import {Colors} from '../../constants/colors';

const {width, height} = Dimensions.get('window');

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${Colors.task};
  align-items: flex-start;
  justify-content: space-between;
  width: ${width}px;
  height: ${height * 0.1}px;
  padding: 10px;
  margin-vertical: 5px;
  border-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  elevation: 5;
`;
export const TextContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  width: ${width}px;
  height: ${height * 0.1}px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-left: 5px;
`;

export const Description = styled.Text`
  font-size: 16px;
  color: #000;
  margin-left: 10px;
`;
export const DateBox = styled.Text`
  font-size: 10px;
  color: #000;
  margin-left: 10px;
`;

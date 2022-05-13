import styled from 'styled-components';
import {Dimensions} from 'react-native';
import {Layout, Text, CheckBox} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native';

export const Container = styled(Layout)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-vertical: 5px;
  margin-horizontal: 10px;
  border-radius: 10px;
  elevation: 5;
`;
export const TextContainer = styled(TouchableOpacity)`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 20px;
`;

export const Title = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
`;

export const Description = styled(Text)`
  font-size: 16px;
  margin-left: 10px;
`;
export const Date = styled(Text)`
  font-size: 10px;
  margin-left: 10px;
`;
export const CustomCheckBox = styled(CheckBox)`
  border-radius: 10px;
`;

import styled from 'styled-components';
import {Layout, Text} from '@ui-kitten/components';
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const Container = styled(Layout)`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${width}px;
  height: ${height}px;
`;
export const Label = styled(Text)`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

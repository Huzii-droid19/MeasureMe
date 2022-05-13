import styled from 'styled-components';
import {Dimensions} from 'react-native';
import {Layout} from '@ui-kitten/components';

const {height, width} = Dimensions.get('window');

export const Container = styled(Layout)`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${height}px;
  width: ${width}px;
`;

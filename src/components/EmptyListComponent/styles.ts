import styled from 'styled-components';
import {Layout, Text} from '@ui-kitten/components';
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const Container = styled(Layout)({
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: width,
  height: height,
});
export const Label = styled(Text)({
  fontSize: 30,
  fontWeight: 'bold',
  textAlign: 'center',
});

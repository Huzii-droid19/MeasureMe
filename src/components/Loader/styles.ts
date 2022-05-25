import styled from 'styled-components';
import {Dimensions} from 'react-native';
import {Layout} from '@ui-kitten/components';

const {height, width} = Dimensions.get('window');

export const Container = styled(Layout)({
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: height,
  width: width,
});

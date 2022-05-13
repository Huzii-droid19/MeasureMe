import styled from 'styled-components';
import {Input, Layout} from '@ui-kitten/components';
import {Animated} from 'react-native';

export const Container = styled(Animated.View)`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;
export const InputField = styled(Input)`
  width: 100%;
  height: 50px;
`;

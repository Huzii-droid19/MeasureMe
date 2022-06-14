import styled from 'styled-components/native';
import {Icon, Autocomplete} from '@ui-kitten/components';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const StyledIcon = styled(Icon)({
  height: 25,
  width: 25,
});
export const InputField = styled(Autocomplete)({
  width: width * 0.8,
  height: height * 0.05,
  borderRadius: 5,
  paddingHorizontal: 10,
});

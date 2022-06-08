import styled from 'styled-components/native';
import {Button} from '@ui-kitten/components';

export const StyledButton = styled(Button)(({width}) => ({
  width: width,
  borderRadius: 10,
}));

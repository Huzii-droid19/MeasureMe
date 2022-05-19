import styled from 'styled-components/native';
import {Layout, Text} from '@ui-kitten/components';

export const Container = styled(Layout)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ButtonContainer = styled(Layout)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const DeleteText = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
`;

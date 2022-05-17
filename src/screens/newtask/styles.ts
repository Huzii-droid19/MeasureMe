import styled from 'styled-components/native';
import {Layout, Text} from '@ui-kitten/components';

export const Container = styled(Layout)`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Label = styled(Text)`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
`;
export const InputContainer = styled(Layout)`
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 90%;
`;
export const Error = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  color: red;
`;
export const Info = styled(Layout)`
  margin-top: 20px;
`;

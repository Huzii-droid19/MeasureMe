import styled from 'styled-components';
import {Layout, Text, Button, Icon} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native';

export const Container = styled(Layout)`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 35px;
`;
export const Title = styled(Text)`
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
`;
export const ButtonContainer = styled(Layout)`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
`;
export const Error = styled(Text)`
  font-size: 12px;
  font-weight: 600;
  color: red;
`;
export const Info = styled(Layout)`
  margin-top: 10px;
`;
export const Deadline = styled(Text)`
  font-size: 15px;
  font-weight: 600;
`;
export const Description = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  margin-top: 30px;
  text-align: justify;
`;
export const UndoWrapper = styled(Layout)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const UndoText = styled(Text)`
  font-size: 15px;
  font-weight: 700;
  margin-top: 30px;
  text-align: justify;
`;
export const UndoButton = styled(Button)`
  margin-top: 10px;
`;
export const IconWrapper = styled(TouchableOpacity)`
  margin-left: 20px;
`;
export const StyledIcon = styled(Icon)`
  height: 25px;
  width: 25px;
`;

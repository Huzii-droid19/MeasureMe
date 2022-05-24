import styled from 'styled-components/native';
import {Icon, Input, Layout, Text} from '@ui-kitten/components';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const Container = styled(Layout)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-self: flex-start;
  padding-horizontal: 25px;
  height: 10%;
  width: 100%;
  height: 10%;
  elevation: 5;
  background-color: ${({theme}: {theme: string}) => theme};
`;
export const MonthWrapper = styled.TouchableOpacity`
  flex: 0.5;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 4px;
  margin: 5px;
  height: 90%;
  border-radius: 10px;
`;
export const Month = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-right: 10px;
`;
export const StyledIcon = styled(Icon)`
  height: 25px;
  width: 25px;
`;
export const InputField = styled(Input)`
  width: ${width * 0.8}px;
  height: ${height * 0.05}px;
  border-radius: 5px;
  padding-horizontal: 10px;
`;

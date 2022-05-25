import styled from 'styled-components/native';
import {Layout, Text, Icon} from '@ui-kitten/components';

export const Container = styled(Layout)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyConntent: 'space-between',
  padding: 10,
  marginVertical: 5,
  marginHorizontal: 10,
  borderRadius: 10,
  elevation: 5,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 5,
  shadowOffset: {
    width: 0,
    height: 3,
  },
});
export const TextContainer = styled.TouchableOpacity({
  flex: 1,
  flexDriection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  marginLeft: 10,
});
export const Title = styled(Text)({
  fontSize: 16,
  fontWeight: 'bold',
  marginLeft: 10,
});
export const Description = styled(Text)({
  fontSize: 16,
  marginLeft: 10,
});
export const Date = styled(Text)({
  fontSize: 10,
  marginLeft: 10,
});
export const StyledIcon = styled(Icon)({
  height: 25,
  width: 25,
  marginRight: 10,
});
export const IconWrapper = styled.TouchableOpacity({});

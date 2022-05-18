import React from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {
  Container,
  Error,
  Info,
  Title,
  Deadline,
  Description,
  ButtonContainer,
  UndoText,
  UndoButton,
  UndoWrapper,
  IconWrapper,
  StyledIcon,
} from './styles';

import {Task} from '../../types';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import moment from 'moment';
import {LoadingButton} from '../../components';
import {useTheme} from '@ui-kitten/components';

type DetailsScreenProps = {
  route: RouteProp<{params: {item: Task}}, 'params'>;
  navigation: NavigationProp<any>;
};

const Details = ({navigation, route}: DetailsScreenProps) => {
  const {item}: {item: Task} = route.params;
  const theme = useTheme();
  const ScrollViewProps = {
    contentContainerStyle: {
      flexGrow: 1,
      backgroundColor: theme['background-basic-color-1'],
    },
  };

  const renderIcon = () => (
    <>
      <IconWrapper>
        <StyledIcon name="trash-2-outline" fill={theme['color-danger-500']} />
      </IconWrapper>
      <IconWrapper>
        <StyledIcon name="edit-2-outline" fill={theme['color-primary-500']} />
      </IconWrapper>
    </>
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderIcon,
    });
  }, [navigation]);
  return (
    <ScreenWrapper
      statusBarColor={theme['background-basic-color-1']}
      barStyle="dark-content"
      scrollType="scroll"
      scrollViewProps={ScrollViewProps}>
      <Container>
        <Title category="label">{item.title}</Title>
        <Deadline>{`Due: ${moment(item.date).format('YYYY-MM-DD')}`}</Deadline>
        <Description>{item.description}</Description>
        <ButtonContainer>
          {item.isCompleted ? (
            <UndoWrapper>
              <UndoText>Task has been Completed</UndoText>
              <UndoButton appearance="ghost" size="medium">
                Renew
              </UndoButton>
            </UndoWrapper>
          ) : (
            <LoadingButton label="Mark as Complete" />
          )}
        </ButtonContainer>
      </Container>
    </ScreenWrapper>
  );
};

export default Details;

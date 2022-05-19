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
  UndoWrapper,
  IconWrapper,
  StyledIcon,
} from './styles';

import {Task} from '../../types';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import moment from 'moment';
import {DeleteModal, LoadingButton} from '../../components';
import {useTheme} from '@ui-kitten/components';
import {useEditTaskMutation} from '../../store/slice/apiSlice';
import Toast from 'react-native-toast-message';

type DetailsScreenProps = {
  route: RouteProp<{params: {item: Task}}, 'params'>;
  navigation: NavigationProp<any>;
};

const Details = ({navigation, route}: DetailsScreenProps) => {
  const {item}: {item: Task} = route.params;
  const [visible, setVisible] = React.useState(false);
  const theme = useTheme();
  const ScrollViewProps = {
    contentContainerStyle: {
      flexGrow: 1,
      backgroundColor: theme['background-basic-color-1'],
    },
  };

  const renderIcon = () => (
    <>
      <IconWrapper onPress={() => setVisible(!visible)}>
        <StyledIcon name="trash-2-outline" fill={theme['color-danger-500']} />
      </IconWrapper>
      <IconWrapper onPress={() => navigation.navigate('Edit', {item: item})}>
        <StyledIcon name="edit-2-outline" fill={theme['color-primary-500']} />
      </IconWrapper>
    </>
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderIcon,
    });
  }, [navigation]);

  const onClose = () => {
    setVisible(!visible);
  };
  const backdropStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };
  const [editTask, {isSuccess, isLoading, isError, error}] =
    useEditTaskMutation();
  const onStatusUpdate = (status: boolean) => {
    editTask({...item, isCompleted: status});
  };
  React.useEffect(() => {
    if (isSuccess) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Task Status',
        text2: 'Completed Successfully🎉',
        visibilityTime: 3000,
      });
      navigation.goBack();
    }
  }, [isSuccess]);
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
            <LoadingButton
              isLoading={isLoading}
              label="Reopen"
              appearance="ghost"
              status="primary"
              onPress={() => onStatusUpdate(false)}
            />
          ) : (
            <LoadingButton
              isLoading={isLoading}
              label="Complete Task"
              appearance="filled"
              status="primary"
              onPress={() => onStatusUpdate(true)}
            />
          )}
        </ButtonContainer>
        <Info>
          <Error>{isError && error}</Error>
        </Info>
      </Container>
      <DeleteModal
        visible={visible}
        onClose={onClose}
        backdropStyle={backdropStyle}
        onBackdropPress={onClose}
        task={item}
        navigation={navigation}
      />
    </ScreenWrapper>
  );
};

export default Details;

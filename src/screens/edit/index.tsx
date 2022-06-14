import React, {useLayoutEffect} from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import type {RouteProp, NavigationProp} from '@react-navigation/native';
import {useTheme} from '@ui-kitten/components';
import {ImageProps, StyleSheet} from 'react-native';
import {pathOr} from 'ramda';

import {Container, Error, InputContainer, StyledIcon} from './styles';
import {
  RenderInputController,
  RenderDateController,
  LoadingButton,
  MeetupButton,
  CheckBox,
} from 'components';
import {TaskForm, Task, RootStackParamsList} from 'types';
import {Todo} from 'store/api';
import {addToast} from 'utils';
import {editTaskSchema} from 'schemas';

interface EditScreenProps {
  route: RouteProp<{params: {task: Task}}, 'params'>;
  navigation: NavigationProp<RootStackParamsList>;
}

const EditTask = ({route, navigation}: EditScreenProps) => {
  const [editTask, {isLoading}] = Todo.useEditTaskMutation();
  const {task}: {task: Task} = route.params;
  const theme = useTheme();
  const title: string = pathOr('', ['title'], task);
  const description: string = pathOr('', ['description'], task);
  const deadline: Date = pathOr('', ['date'], task);
  const isCompleted: boolean = pathOr(false, ['isCompleted'], task);
  const eventId: string = pathOr('', ['eventId'], task);
  const hangoutLink: string = pathOr('', ['hangoutLink'], task);
  const [googleCalendarState, setGoogleCalendarState] = React.useState({
    isEventAdded: eventId.length > 0,
    isMeetupAdded: hangoutLink.length > 0,
  });

  const {
    control,
    setValue,
    getValues,
    formState: {errors, isValid},
    reset,
  } = useForm<TaskForm>({
    defaultValues: {
      title: title,
      description: description,
      date: new Date(deadline),
    },
    resolver: yupResolver(editTaskSchema(task)),
    mode: 'all',
  }); // form intialization

  const onSubmit = async () => {
    try {
      const {date, description, title} = getValues();
      const {error} = await editTask({...task, title, description, date});
      if (error) {
        throw new Error(error);
      }
    } catch (error: any) {
      addToast(error.message, 'error');
    } finally {
      navigation.goBack();
      reset();
    }
  }; // function to call when user submit the form

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <LoadingButton
          size="small"
          label="Edit Task"
          onPress={onSubmit}
          isLoading={isLoading}
          disabled={!isValid}
          status="primary"
          appearance="filled"
        />
      ),
    });
  }, [isLoading, isValid]);

  const onMeetupAdded = (isMeetupAdded: boolean) => {
    setGoogleCalendarState({
      ...googleCalendarState,
      isMeetupAdded: isMeetupAdded,
    });
  };

  return (
    <ScreenWrapper
      barStyle="dark-content"
      statusBarColor={theme['background-basic-color-1']}>
      <Container>
        <InputContainer>
          <RenderInputController
            name="title"
            inputControl={control}
            textStyle={textStyle.titleTextStyle}
            placeholder="Title"
          />
          <Error>{pathOr('', ['title', 'message'], errors)}</Error>
          <RenderInputController
            name="description"
            inputControl={control}
            multiline={true}
            textStyle={textStyle.descriptionTextStyle}
            placeholder="Description"
            accessoryLeft={(props: ImageProps) => (
              <StyledIcon {...props} name="menu-2-outline" />
            )}
          />
          <Error>{pathOr('', ['description', 'message'], errors)}</Error>
          <RenderDateController
            name="date"
            inputControl={control}
            setValue={setValue}
            getValues={getValues}
          />
          <Error>{pathOr('', ['date', 'message'], errors)}</Error>
          <CheckBox
            value={googleCalendarState.isEventAdded}
            onChange={() =>
              setGoogleCalendarState({
                ...googleCalendarState,
                isEventAdded: !googleCalendarState.isEventAdded,
              })
            }
            label="Add task to google calendar"
          />
        </InputContainer>
        {googleCalendarState.isEventAdded && (
          <MeetupButton
            isMeetupAdded={googleCalendarState.isMeetupAdded}
            setIsMeetUpAdded={() =>
              onMeetupAdded(!googleCalendarState.isMeetupAdded)
            }
          />
        )}
      </Container>
    </ScreenWrapper>
  );
};

export default EditTask;

const textStyle = StyleSheet.create({
  titleTextStyle: {
    fontSize: 25,
    fontWeight: '600',
    minHeight: 64,
    paddingLeft: 40,
  },
  descriptionTextStyle: {
    fontSize: 16,
    minHeight: 64,
    fontWeight: '400',
  },
});

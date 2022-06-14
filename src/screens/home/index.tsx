import React, {useState, useRef, useEffect, useCallback} from 'react';
import {Animated, RefreshControl} from 'react-native';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {useTheme} from '@ui-kitten/components';
import {DateData} from 'react-native-calendars';
import {pathOr} from 'ramda';
import moment from 'moment';

import {Todo} from 'store/api';
import {
  Container,
  CalendarView,
  TaskCalendar,
  StyledIcon,
  TaskList,
  FloatingButton,
} from './styles';
import {TaskView, EmptyListComponent, Header} from 'components';
import {Task} from 'types';
import {NavigationService} from 'navigation';

const Home = () => {
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
  const {data: tasks, isLoading, refetch} = Todo.useGetTasksQuery();
  const [filteredData, setFilteredData] = useState(tasks);
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);
  const CalendarAnimatedValue = useRef(new Animated.Value(-500)).current;
  const ListAnimatedValue = useRef(new Animated.Value(0)).current;
  const theme = useTheme();
  const markDates = {} as any;

  tasks?.forEach((task: Task) => {
    markDates[moment(task.date).format('YYYY-MM-DD')] = {
      marked: true,
      dotColor: pathOr(false, ['isCompleted'], task)
        ? theme['color-primary-700']
        : theme['color-danger-700'],
    };
  });

  const animateCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
    Animated.parallel([
      Animated.timing(CalendarAnimatedValue, {
        toValue: isCalendarVisible ? 80 : -500,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(ListAnimatedValue, {
        toValue: isCalendarVisible ? 300 : 0,
        duration: 500,
        delay: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderItemCall = ({item}: {item: Task}) => {
    return (
      <TaskView
        item={item}
        onPress={() => NavigationService.navigate('Details', {task: item})}
        theme={theme}
      />
    );
  };
  const renderEmptyList = () => <EmptyListComponent />;

  const onRefresh = useCallback(() => {
    // call when swipe down to refresh
    refetch();
    setFilteredData(tasks);
    setCurrentDate(moment(new Date()).format('YYYY-MM-DD'));
  }, [tasks]);

  const onDayPress = (day: DateData) => {
    // call on date select from  calendar
    setFilteredData(
      tasks?.filter(
        (task: Task) =>
          new Date(task.date).getDate() === new Date(day.dateString).getDate(),
      ),
    );
    setCurrentDate(day.dateString);
    animateCalendar();
  };

  useEffect(() => setFilteredData(tasks), [tasks]);

  return (
    <ScreenWrapper
      statusBarColor={theme['color-header']}
      barStyle="dark-content">
      <Container>
        <Header
          currentDate={currentDate}
          calendarHandler={animateCalendar}
          isCalendarVisible={isCalendarVisible}
          data={tasks}
          setData={setFilteredData}
        />
        <CalendarView
          style={{transform: [{translateY: CalendarAnimatedValue}]}}>
          <TaskCalendar
            enableSwipeMonths
            current={currentDate}
            onDayPress={onDayPress}
            markedDates={{
              ...markDates,
              [currentDate]: {
                selected: true,
              },
            }}
            theme={{calendarBackground: theme['color-header']}}
          />
        </CalendarView>
        <TaskList
          style={{
            transform: [{translateY: ListAnimatedValue}],
          }}
          isCalendarVisible={isCalendarVisible}
          data={filteredData}
          renderItem={renderItemCall}
          keyExtractor={(item: Task) => pathOr('', ['id'], item).toString()}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          ListEmptyComponent={renderEmptyList}
        />
        <FloatingButton
          onPress={() => NavigationService.navigate('NewTask')}
          accessoryLeft={(props: any) => (
            <StyledIcon {...props} name="plus-outline" />
          )}
        />
      </Container>
    </ScreenWrapper>
  );
};

export default Home;

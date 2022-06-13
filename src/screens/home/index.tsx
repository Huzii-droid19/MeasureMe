import React, {useState, useRef, useEffect, useCallback} from 'react';
import {Animated, RefreshControl} from 'react-native';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {Todo} from 'store/api/index';
import {
  Container,
  CalendarView,
  TaskCalendar,
  StyledIcon,
  TaskList,
  FloatingButton,
} from './styles';
import {TaskView, EmptyListComponent, Header} from 'components/index';
import {Task} from 'types/index';
import {useTheme} from '@ui-kitten/components';
import moment from 'moment';
import {DateData} from 'react-native-calendars';
import {NavigationService} from 'navigation/index';
import {pathOr} from 'ramda';

const Home = () => {
  const {useGetTasksQuery} = Todo;
  const [currentDate, setCurrentDate] = useState(moment().format('YYYY-MM-DD'));
  const {data: tasks, isLoading, refetch} = useGetTasksQuery();
  const [filteredData, setFilteredData] = useState(tasks);
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);
  const [search, setSearch] = useState('');
  const CalendarAnimatedValue = useRef(new Animated.Value(-500)).current;
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
  const ViewProps = {
    transform: [{translateY: CalendarAnimatedValue}],
  };
  const animateCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
    Animated.timing(CalendarAnimatedValue, {
      toValue: isCalendarVisible ? 80 : -500,
      duration: 600,
      useNativeDriver: true,
    }).start();
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
  const onSearch = (text: string) => {
    //call when text type in searchbar
    setFilteredData(
      tasks?.filter(
        (item: Task) =>
          pathOr('', ['title'], item)
            .toLowerCase()
            .indexOf(text.toLowerCase()) > -1,
      ),
    );
    setSearch(text);
  };
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
        <>
          <Header
            currentDate={currentDate}
            calendarHandler={animateCalendar}
            search={search}
            onSearch={onSearch}
          />
          <CalendarView style={ViewProps}>
            <TaskCalendar
              enableSwipeMonths={true}
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
        </>
        <TaskList
          data={filteredData}
          renderItem={renderItemCall}
          keyExtractor={(item: Task) => pathOr('', ['id'], item).toString()}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
          ListEmptyComponent={!isLoading && renderEmptyList}
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

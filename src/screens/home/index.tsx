import React, {useState, useRef} from 'react';
import {
  StatusBar,
  TouchableOpacity,
  Animated,
  RefreshControl,
} from 'react-native';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {useGetTasksQuery} from '../../store/slice/apiSlice';
import {getUniqueId} from 'react-native-device-info';
import {
  Container,
  MonthView,
  CalendarView,
  Month,
  Header,
  ItemSeparator,
  InputField,
  TaskCalendar,
  StyledIcon,
  TaskList,
  FloatingButton,
} from './styles';
import {ItemView, Loader, EmptyListComponent} from '../../components';
import {Task} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTheme} from '@ui-kitten/components';
import moment from 'moment';

const Home = ({navigation}: NativeStackScreenProps<any>) => {
  const {
    data: tasks,
    isSuccess,
    refetch,
    isError,
    error,
  } = useGetTasksQuery(getUniqueId());
  const [currentDate, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);
  const [search, setSearch] = useState('');
  const [isSearchingVisible, setIsSearchingVisible] = useState(false);
  const CalendarAnimatedValue = useRef(new Animated.Value(-500)).current;
  const theme = useTheme();
  const markDates = {} as any;
  tasks?.forEach((task: Task) => {
    markDates[moment(task.date).format('YYYY-MM-DD')] = {
      marked: true,
      dotColor: theme['color-primary-700'],
    };
  });

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
      <ItemView
        item={item}
        onPress={() => navigation.navigate('Details', {item})}
      />
    );
  };
  const renderEmptyList = () => <EmptyListComponent />;

  return (
    <ScreenWrapper>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme['color-header']}
      />

      <Container>
        <Header theme={theme['color-header']}>
          {isSearchingVisible ? (
            <>
              <InputField
                placeholder="Search"
                value={search}
                onChangeText={(text: React.SetStateAction<string>) =>
                  setSearch(text)
                }
              />
              <TouchableOpacity
                onPress={() => {
                  setIsSearchingVisible(false);
                  setSearch('');
                }}>
                <StyledIcon
                  name="close"
                  fill={theme['color-primary-default']}
                />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <MonthView onPress={animateCalendar}>
                <Month>{moment(currentDate).format('MMMM-DD')}</Month>
                <StyledIcon
                  name="calendar-outline"
                  fill={theme['color-primary-default']}
                />
              </MonthView>
              <TouchableOpacity
                onPress={() => {
                  setIsSearchingVisible(!isSearchingVisible);
                }}>
                <StyledIcon
                  name="search-outline"
                  fill={theme['color-primary-default']}
                />
              </TouchableOpacity>
            </>
          )}
        </Header>

        <CalendarView translateY={CalendarAnimatedValue}>
          <TaskCalendar
            enableSwipeMonths={true}
            current={moment(currentDate).format('YYYY-MM-DD')}
            onDayPress={(day: any) => {
              setDate(day.dateString);
              animateCalendar();
            }}
            markedDates={{
              ...markDates,
              [moment(currentDate).format('YYYY-MM-DD')]: {
                selected: true,
              },
            }}
            theme={{calendarBackground: theme['color-header']}}
          />
        </CalendarView>

        {isSuccess ? (
          <TaskList
            data={tasks}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItemCall}
            keyExtractor={(item: Task) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={!isSuccess} onRefresh={refetch} />
            }
            ListEmptyComponent={renderEmptyList}
          />
        ) : (
          <Loader />
        )}
      </Container>
      <FloatingButton
        onPress={() => navigation.navigate('NewTask')}
        accessoryLeft={(props: any) => (
          <StyledIcon {...props} name="plus-outline" />
        )}
      />
    </ScreenWrapper>
  );
};

export default Home;

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
import {ItemView, Loader, AddNewTask} from '../../components';
import {Colors} from '../../constants/colors';
import {Task} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTheme} from '@ui-kitten/components';

const Home = ({navigation}: NativeStackScreenProps<any>) => {
  const {data, isSuccess, refetch} = useGetTasksQuery(getUniqueId());
  const [date, setDate] = useState(new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [isSearchingVisible, setIsSearchingVisible] = useState(false);
  const NewTaskAnimatedValue = useRef(new Animated.Value(100)).current;
  const CalendarAnimatedValue = useRef(new Animated.Value(-500)).current;
  const theme = useTheme();

  const animateCalendar = () => {
    setIsCalendarVisible(!isCalendarVisible);
    Animated.timing(CalendarAnimatedValue, {
      toValue: isCalendarVisible ? 80 : -500,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const animateNewTaskComponent = () => {
    Animated.timing(NewTaskAnimatedValue, {
      toValue: 0,
      duration: 1000,

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

  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.header} />
      <Container>
        <Header>
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
                <Month>April</Month>
                <StyledIcon
                  name="calendar-outline"
                  fill={theme['color-primary-default']}
                />
              </MonthView>
              <TouchableOpacity
                onPress={() => setIsSearchingVisible(!isSearchingVisible)}>
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
            date={date}
            onSelect={(nextDate: React.SetStateAction<Date>) =>
              setDate(nextDate)
            }
          />
        </CalendarView>

        {isSuccess ? (
          <TaskList
            data={data}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItemCall}
            keyExtractor={(item: Task) => item.id.toString()}
            refreshControl={
              <RefreshControl refreshing={!isSuccess} onRefresh={refetch} />
            }
          />
        ) : (
          <Loader />
        )}
      </Container>
      <FloatingButton
        onPress={animateNewTaskComponent}
        accessoryLeft={(props: any) => (
          <StyledIcon {...props} name="plus-outline" />
        )}
      />
      {<AddNewTask translateY={NewTaskAnimatedValue} />}
    </ScreenWrapper>
  );
};

export default Home;

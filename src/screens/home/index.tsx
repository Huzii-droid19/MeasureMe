import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FlatList,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {useGetTasksQuery} from '../../store/services/service';
import {getUniqueId} from 'react-native-device-info';
import {
  Container,
  MonthView,
  CalendarView,
  Month,
  Header,
  ListContainer,
  InputView,
  InputField,
  TaskCalendar,
} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {TaskContainer} from '../../components';
import {Colors} from '../../constants/colors';

const Home = ({navigation, route}: NativeStackScreenProps<any>) => {
  const {data, isLoading, isSuccess} = useGetTasksQuery(getUniqueId());
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  return (
    <ScreenWrapper>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.header} />
      <Container>
        <Header>
          {!isSearching && (
            <MonthView onPress={() => setShow(!show)}>
              <Month>April</Month>
              <Icon name="calendar" size={25} color="#900" />
            </MonthView>
          )}
          {isSearching && (
            <InputView>
              <InputField
                placeholder="Search"
                value={search}
                onChangeText={(text: React.SetStateAction<string>) =>
                  setSearch(text)
                }
              />
            </InputView>
          )}
          {!isSearching && (
            <TouchableOpacity onPress={() => setIsSearching(!isSearching)}>
              <Icon name="search1" size={25} color="#900" />
            </TouchableOpacity>
          )}
          {isSearching && (
            <TouchableOpacity
              onPress={() => {
                setIsSearching(false);
                setSearch('');
              }}>
              <Icon name="close" size={25} color="#900" />
            </TouchableOpacity>
          )}
        </Header>
        <CalendarView>
          {show && (
            <TaskCalendar
              date={date}
              onSelect={(nextDate: React.SetStateAction<Date>) =>
                setDate(nextDate)
              }
            />
          )}
        </CalendarView>
        <ListContainer>
          {isSuccess && (
            <FlatList
              data={data}
              renderItem={({item}) => (
                <TaskContainer
                  title={item.title}
                  description={item.description}
                  date={item.date}
                />
              )}
              keyExtractor={item => item.id}
            />
          )}
          {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        </ListContainer>
      </Container>
    </ScreenWrapper>
  );
};

export default Home;

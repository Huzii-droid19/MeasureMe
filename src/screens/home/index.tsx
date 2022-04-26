import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {useGetTasksQuery, Task} from '../../store/services/service';
import {getUniqueId} from 'react-native-device-info';
import {Container, MonthView, CalendarView, Month, Header} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {Calendar, CalendarViewModes} from '@ui-kitten/components';

const Home = ({navigation, route}: NativeStackScreenProps<any>) => {
  //const {data, isLoading} = useGetTasksQuery(getUniqueId());
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  return (
    <ScreenWrapper>
      <Container>
        <Header>
          <MonthView onPress={() => setShow(!show)}>
            <Month>April</Month>
            <Icon name="calendar" size={25} color="#900" />
          </MonthView>
          <Icon name="search1" size={25} color="#900" />
        </Header>
        <CalendarView>
          {show && (
            <Calendar
              date={date}
              onSelect={nextDate => setDate(nextDate)}
              startView={CalendarViewModes.DATE}
              style={{width: '100%'}}
            />
          )}
        </CalendarView>
      </Container>
    </ScreenWrapper>
  );
};

export default Home;

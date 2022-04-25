import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, FlatList, Button, SafeAreaView} from 'react-native';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {useGetTasksQuery} from '../../store/services/service';
import {getUniqueId} from 'react-native-device-info';
import {Container, Title} from './styles';

const Home = ({navigation, route}: NativeStackScreenProps<any>) => {
  const {data, isLoading} = useGetTasksQuery(getUniqueId());

  return (
    <ScreenWrapper>
      <Container>
        <Title>MeasureMe</Title>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({item}) => <Text>{item.Title}</Text>}
            keyExtractor={item => item.id}
          />
        )}
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </Container>
    </ScreenWrapper>
  );
};

export default Home;

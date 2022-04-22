import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, FlatList, View} from 'react-native';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {useGetTasksQuery} from '../../store/services/service';
import {styles} from './styles';

const Home = ({navigation, route}: NativeStackScreenProps<any>) => {
  const {data, isLoading, isError} = useGetTasksQuery(3);
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text>Home</Text>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({item}) => <Text>{item.Title}</Text>}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Home;

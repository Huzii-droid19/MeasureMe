import {View, Text} from 'react-native';
import React from 'react';
import {ScreenWrapper} from 'react-native-screen-wrapper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const Details = ({navigation, route}: NativeStackScreenProps<any>) => {
  return (
    <ScreenWrapper>
      <View>
        <Text>Details</Text>
      </View>
    </ScreenWrapper>
  );
};

export default Details;

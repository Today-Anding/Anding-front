import React from 'react';
import {View, Text, Button} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../types/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to Details1"
        onPress={() => navigation.navigate('Details1')}
      />
      <Button
        title="Go to Details2"
        onPress={() => navigation.navigate('Details2')}
      />
    </View>
  );
};

export default HomeScreen;

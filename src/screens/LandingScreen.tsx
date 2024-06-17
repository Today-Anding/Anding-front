import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../types/types';

type LandingScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  'Landing'
>;

type Props = {
  navigation: LandingScreenNavigationProp;
};

const LandingScreen: React.FC<Props> = ({navigation}) => {
  return (
    <Container>
      <LinearGradient
        colors={['#FF9999', '#FF4E4E']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Title>What Is Your</Title>
        <StyledButton onPress={() => navigation.navigate('Main')}>
          <ButtonText>Anding</ButtonText>
        </StyledButton>
      </LinearGradient>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-family: 'UhBee jung';
  font-size: 20px;
  color: #fff;
  margin-bottom: 20px;
`;

const StyledButton = styled.TouchableOpacity`
  padding: 10px;
`;

const ButtonText = styled.Text`
  font-family: 'PartialSansKR-Regular';
  font-size: 54px;
  color: #fff;
`;

export default LandingScreen;

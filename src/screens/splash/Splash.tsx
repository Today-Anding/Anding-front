import React, { useState } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

function Splash() {
  const [fadeOut] = useState(new Animated.Value(1));
  const navigation = useNavigation();

  const handleSplashClick = () => {
    Animated.timing(fadeOut, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('AuthSelectionScreen');
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.splashLayout, { opacity: fadeOut }]}>
        <SplashText1 source={require('../../assets/images/SplashText1.png')} />
        <LogoCircle>
          <LogoCircleImage
            source={require('../../assets/images/LogoCircleImg.png')}
          />
          <BlackLogoText>Anding</BlackLogoText>
        </LogoCircle>
        <SplashText2 source={require('../../assets/images/SplashText2.png')} />
        <GoStartButton onPress={handleSplashClick}>
          <GoStartText>시작하기</GoStartText>
          <GoDownImage source={require('../../assets/images/GoDownImg.png')} />
        </GoStartButton>
        <BackgroundImages>
          <SplashGradient1
            source={require('../../assets/images/SplashGradient1.png')}
          />
          <SplashGradient2
            source={require('../../assets/images/SplashGradient2.png')}
          />
          <SplashImg1 source={require('../../assets/images/SplashImg1.png')} />
          <SplashImg2 source={require('../../assets/images/SplashImg2.png')} />
          <SplashImg3 source={require('../../assets/images/SplashImg3.png')} />
          <SplashImg4 source={require('../../assets/images/SplashImg4.png')} />
        </BackgroundImages>
      </Animated.View>
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

const BackgroundImages = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const SplashGradient1 = styled.Image`
  position: absolute;
  top: 0;
  right: 0;
`;

const SplashGradient2 = styled.Image`
  position: absolute;
  top: 300px;
  left: 0;
`;

const SplashImg1 = styled.Image`
  position: absolute;
  top: 34px;
  right: 0;
`;

const SplashImg2 = styled.Image`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const SplashImg3 = styled.Image`
  position: absolute;
  top: 240px;
  left: 44px;
`;

const SplashImg4 = styled.Image`
  position: absolute;
  top: 545px;
  right: 53px;
`;

const SplashText1 = styled.Image`
  position: absolute;
  top: 324px;
  align-self: center;
`;

const SplashText2 = styled.Image`
  position: absolute;
  top: 474px;
  align-self: center;
`;

const GoStartButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 182px;
  gap: 13px;
  align-items: center;
  z-index: 1;
`;

const GoStartText = styled.Text`
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
  font-family: 'Noto Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

const GoDownImage = styled.Image``;

const LogoCircle = styled.View`
  position: absolute;
  top: 370px;
  width: 320px;
  height: 109px;
  align-items: center;
  justify-content: center;
  align-self: center;
  z-index: 1;
`;

const LogoCircleImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const BlackLogoText = styled.Text`
  color: #262626;
  font-family: 'PartialSansKR-Regular';
  font-size: 54px;
  font-style: normal;
  font-weight: 400;
  position: absolute;
`;

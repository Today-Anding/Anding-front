import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Splash() {
  const [fadeOut] = useState(new Animated.Value(1));
  const navigation = useNavigation();

  const handleSplashClick = () => {
    Animated.timing(fadeOut, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('Main');
    });
  };

  return (
    <Animated.View style={[styles.splashLayout, { opacity: fadeOut }]}>
      <Text style={styles.splashText1}>WHAT IS YOUR</Text>
      <Text style={styles.splashText2}>Anding</Text>
      <TouchableOpacity style={styles.splashStart} onPress={handleSplashClick}>
        <Text style={styles.splashStartText}>시작하기</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  splashLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A15252',
    paddingTop: '20%',
  },
  splashText1: {
    color: '#FFFFFF',
    fontFamily: 'UhBee jung',
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  splashText2: {
    color: '#FFFFFF',
    fontFamily: 'PartialSansKR-Regular',
    fontSize: 54,
    fontWeight: '400',
    lineHeight: 64,
    letterSpacing: 1,
    marginBottom: 80,
  },
  splashStart: {
    width: 305,
    height: 44,
    borderRadius: 4,
    backgroundColor: '#FF5D5D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashStartText: {
    color: '#FFFFFF',
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.4,
  },
});

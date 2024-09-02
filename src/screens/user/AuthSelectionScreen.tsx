import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BlackLogo } from '../../components/logo/Logo';
import GobackButton from '../../components/button/GobackButton';
import { Black10px, Black14px, Black20px } from '../../components/text/Text';
import Button from '../../components/button/Button';

function AuthSelectionScreen() {
  return (
    <View style={styles.container}>
      <BlackLogo style={styles.logo} />
      <GobackButton style={styles.gobackButton} />
      <Black20px style={styles.text}>당신의</Black20px>
      <Black20px style={styles.text}>엔딩을 만들고 싶다면,</Black20px>
      <Black14px style={styles.smalltext}>기존의 앤딩 유저라면,</Black14px>
      <Button navigateTo={'Login'} text={'로그인'} style={styles.button} />
      <Black14px style={styles.smalltext}>
        새로운 앤딩 작가가 되고 싶다면,
      </Black14px>
      <Button navigateTo={'SignUp'} text={'회원가입'} style={styles.button} />
      <Black10px style={styles.snsText}>
        -------- SNS 계정으로 로그인 --------
      </Black10px>
      <TouchableOpacity style={[styles.naverButton, styles.centered]}>
        <Text style={styles.naverButtonText}>N</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    paddingLeft: 50,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  logo: {
    marginBottom: 20,
  },
  gobackButton: {
    marginBottom: 20,
    marginTop: 20,
  },
  text: {},
  smalltext: {
    marginTop: 50,
  },
  button: {
    marginVertical: 10,
  },
  snsText: {
    marginTop: 50,
    marginBottom: 10,
    textAlign: 'center',
    alignSelf: 'center',
  },
  naverButton: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#2DB400',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  naverButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  centered: {
    alignSelf: 'center',
  },
});

export default AuthSelectionScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Button, { SmallButton } from '../components/button/Button';
import { Pink12px } from '../components/text/Text';
import { BlackLogo } from '../components/logo/Logo';
import { Inputtext } from '../components/input/Input';
import { List } from '../components/list/List';

const ComponentTest = ({ navigation }: { navigation: any }) => {
  const [text, setText] = useState('');
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>컴포넌트 테스트</Text>
      <Pink12px>하이</Pink12px>
      <BlackLogo />
      <Button text="버튼" navigateTo={'SignUpName'} />
      <SmallButton text="버튼" navigateTo={'Home'} />
      <Inputtext
        label="이름"
        value={text}
        onChangeText={newText => setText(newText)}
      />
      <List />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/images/BackArrow.png')} // 경로를 올바르게 수정합니다.
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ComponentTest;

// src/screens/DetailPage.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  PinkBackground,
  ReadGlassBackground,
  ReadGlassTextBackground,
} from '../../components/background/Background';
import { WhiteLogo } from '../../components/logo/Logo';
import { Black12px, Black16px } from '../../components/text/Text';

export type RootStackParamList = {
  StoryReadCategory: undefined;
  StoryReadDetail: { title: string };
};
// 타입 정의
type DetailPageRouteProp = RouteProp<RootStackParamList, 'StoryReadDetail'>;

function StoryReadDetail() {
  const route = useRoute<DetailPageRouteProp>();
  const { title } = route.params;

  return (
    <View style={styles.container}>
      <PinkBackground>
        <WhiteLogo />
      </PinkBackground>
      <ReadGlassBackground>
        <Black16px>'{title}'의 앤딩입니다.</Black16px>
        <Black12px>작가 유경빈</Black12px>
        <ReadGlassTextBackground>
          <Text style={styles.content}>
            여기에서 {title}의 상세 내용을 표시합니다.
          </Text>
        </ReadGlassTextBackground>
      </ReadGlassBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 12,
  },
});

export default StoryReadDetail;

import React from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 네비게이션 훅 import
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // 네비게이션 타입 import
import {
  BigGlassBackground,
  PinkBackground,
} from '../../components/background/Background';
import { WhiteLogo } from '../../components/logo/Logo';
import { Black16px } from '../../components/text/Text';
import { CategoryButton } from '../../components/button/CategoryButton';
import { List } from '../../components/list/List';
import SampleListImg from '../../assets/images/SampleListImg.png';

// 네비게이션 타입 정의
type RootStackParamList = {
  StoryReadDetail: { title: string };
};

// 카테고리 버튼 클릭 핸들러 함수들
const handleRomancePress = () => {
  Alert.alert('로맨스 카테고리 선택됨', '로맨스 카테고리를 선택하셨습니다.');
};

const handleActionPress = () => {
  Alert.alert('액션 카테고리 선택됨', '액션 카테고리를 선택하셨습니다.');
};

const handleMysteryPress = () => {
  Alert.alert('추리 카테고리 선택됨', '추리 카테고리를 선택하셨습니다.');
};

const handleComedyPress = () => {
  Alert.alert('코믹 카테고리 선택됨', '코믹 카테고리를 선택하셨습니다.');
};

const handleFantasyPress = () => {
  Alert.alert('판타지 카테고리 선택됨', '판타지 카테고리를 선택하셨습니다.');
};

function StoryReadCategory() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>(); // 네비게이션 훅 사용

  // 리스트 클릭 핸들러
  const handleListPress = (title: string) => {
    navigation.navigate('StoryReadDetail', { title });
  };

  return (
    <View style={styles.container}>
      <PinkBackground>
        <WhiteLogo />
      </PinkBackground>
      <BigGlassBackground>
        <Black16px>5가지 카테고리의</Black16px>
        <Black16px>다양한 앤딩들이 있어요</Black16px>
        <View style={styles.buttonRow}>
          <CategoryButton text="로맨스" onPress={handleRomancePress} />
          <CategoryButton text="액션" onPress={handleActionPress} />
          <CategoryButton text="추리" onPress={handleMysteryPress} />
          <CategoryButton text="코믹" onPress={handleComedyPress} />
          <CategoryButton text="판타지" onPress={handleFantasyPress} />
        </View>
        <View>
          <List
            imageSource={SampleListImg}
            rank={1}
            title="별에서 온 그대"
            likes="좋아요 1.5K"
            endings="앤딩작 10개"
            onPress={() => handleListPress('별에서 온 그대')}
          />
          <List
            imageSource={SampleListImg}
            rank={2}
            title="다시 만난 세계"
            likes="좋아요 2.3K"
            endings="앤딩작 5개"
            onPress={() => handleListPress('다시 만난 세계')}
          />
          <List
            imageSource={SampleListImg}
            rank={3}
            title="해를 품은 달"
            likes="좋아요 2.3K"
            endings="앤딩작 5개"
            onPress={() => handleListPress('해를 품은 달')}
          />
          <List
            imageSource={SampleListImg}
            rank={4}
            title="주군의 태양"
            likes="좋아요 2.3K"
            endings="앤딩작 5개"
            onPress={() => handleListPress('주군의 태양')}
          />
        </View>
      </BigGlassBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    gap: 40,
  },
});

export default StoryReadCategory;

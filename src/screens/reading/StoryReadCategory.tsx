import React, { useState } from 'react';
import { Alert, View, StyleSheet, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  BigGlassBackground,
  PinkBackground,
} from '../../components/background/Background';
import { WhiteLogo } from '../../components/logo/Logo';
import { Black16px } from '../../components/text/Text';
import { CategoryButton } from '../../components/button/CategoryButton';
import { List } from '../../components/list/List';
import SampleListImg from '../../assets/images/SampleListImg.png';
import Modal from '../../components/modal/Modal';
import styled from 'styled-components/native';

type RootStackParamList = {
  StoryInfoReview: { title: string };
};

const handleShortPress = () => {
  Alert.alert('단편 카테고리 선택됨', '단편 카테고리를 선택하셨습니다.');
};

const handleMiddlePress = () => {
  Alert.alert('중편 카테고리 선택됨', '중편 카테고리를 선택하셨습니다.');
};

const handleLongPress = () => {
  Alert.alert('장편 카테고리 선택됨', '장편 카테고리를 선택하셨습니다.');
};

function StoryReadCategory() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');

  // 리스트 클릭 핸들러
  const handleListPress = (title: string) => {
    setSelectedTitle(title);
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    navigation.navigate('StoryInfoReview', { title: selectedTitle });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <PinkBackground>
        <WhiteLogo />
      </PinkBackground>
      <BigGlassBackground>
        <Black16px>5가지 카테고리의</Black16px>
        <Black16px>다양한 앤딩들이 있어요</Black16px>
        <SearchContainer>
          <SearchInput placeholder="찾고 계신 앤딩을 검색해보세요" />
          <Image
            source={require('../../assets/images/searchImg.png')}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: 14, height: 14 }}
          />
        </SearchContainer>

        <View style={styles.buttonRow}>
          <CategoryButton text="단편" onPress={handleShortPress} />
          <CategoryButton text="중편" onPress={handleMiddlePress} />
          <CategoryButton text="장편" onPress={handleLongPress} />
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

      {isModalVisible && (
        <Modal
          title="앤딩 읽기"
          message="앤딩 읽기를 시작할까요?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },
});

const SearchContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-bottom-width: 0.5px;
  border-bottom-color: #000;
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  color: rgba(0, 0, 0, 0.25);
  font-family: 'Noto Sans KR';
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
`;

export default StoryReadCategory;

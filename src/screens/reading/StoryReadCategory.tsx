import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Image, ScrollView } from 'react-native';
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
import Modal from '../../components/modal/Modal';
import axios from 'axios';
import styled from 'styled-components/native';
import SampleListImg from '../../assets/images/SampleListImg.png';
import Config from 'react-native-config';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

// 스토리 타입 정의
type Story = {
  five_id?: number;
  ten_id?: number;
  fifteen_id?: number;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  finished: boolean;
};

// 네비게이션 스택 타입 정의
type RootStackParamList = {
  StoryInfoReview: { story: Story };
};

const StoryReadCategory: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // 상태값: 모달 표시 여부, 선택된 스토리, 스토리 목록
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);

  // API URL
  const apiUrl = Config.API_URL;

  // 페이지 로드 시 전체 카테고리 스토리 목록을 가져옴
  useEffect(() => {
    fetchAllCategories();
  }, []);

  // 전체 카테고리 스토리 목록을 가져오는 함수
  const fetchAllCategories = async () => {
    try {
      const [fiveResponse, tenResponse, fifteenResponse] = await Promise.all([
        axios.get(`${apiUrl}/api/v1/five/getFiveList`),
        axios.get(`${apiUrl}/api/v1/ten/getTenList`),
        axios.get(`${apiUrl}/api/v1/fifteen/getFifteenList`),
      ]);

      const allStories = [
        ...fiveResponse.data.items,
        ...tenResponse.data.items,
        ...fifteenResponse.data.items,
      ];
      setStories(allStories);
    } catch (error) {
      console.error('전체 스토리 데이터를 불러오는 중 에러 발생:', error);
    }
  };

  // 특정 카테고리의 스토리 목록을 가져오는 함수
  const fetchStoriesByCategory = async (category: string) => {
    try {
      let response;
      switch (category) {
        case '단편':
          response = await axios.get(`${apiUrl}/api/v1/five/getFiveList`);
          break;
        case '중편':
          response = await axios.get(`${apiUrl}/api/v1/ten/getTenList`);
          break;
        case '장편':
          response = await axios.get(`${apiUrl}/api/v1/fifteen/getFifteenList`);
          break;
        default:
          return fetchAllCategories();
      }
      setStories(response.data.items);
    } catch (error) {
      console.error(
        `${category} 카테고리의 스토리 데이터를 불러오는 중 에러 발생:`,
        error,
      );
    }
  };

  // 리스트 아이템 클릭 시 상세 스토리 데이터를 가져오는 함수
  const handleListPress = async (story: Story) => {
    try {
      let detailUrl = '';
      if (story.five_id) {
        detailUrl = `${apiUrl}/api/v1/five/getFive/${story.five_id}`;
      } else if (story.ten_id) {
        detailUrl = `${apiUrl}/api/v1/ten/getTen/${story.ten_id}`;
      } else if (story.fifteen_id) {
        detailUrl = `${apiUrl}/api/v1/fifteen/getFifteen/${story.fifteen_id}`;
      }

      if (detailUrl) {
        const response = await axios.get(detailUrl);
        setSelectedStory(response.data); // 선택된 스토리 데이터 저장
        setIsModalVisible(true); // 모달 표시
      }
    } catch (error) {
      console.error('스토리 상세 정보를 가져오는 중 에러 발생:', error);
    }
  };

  // 모달의 '확인' 버튼 클릭 시 실행되는 함수
  const handleConfirm = async () => {
    setIsModalVisible(false);
    if (!selectedStory) return;

    let endpoint = '';
    let requestData = {
      fifteenId: 0,
      fiveId: 0,
      tenId: 0,
    };

    if (selectedStory.five_id) {
      endpoint = `${apiUrl}/api/v1/star/createStar/five`;
      requestData.fiveId = selectedStory.five_id;
    } else if (selectedStory.ten_id) {
      endpoint = `${apiUrl}/api/v1/star/createStar/ten`;
      requestData.tenId = selectedStory.ten_id;
    } else if (selectedStory.fifteen_id) {
      endpoint = `${apiUrl}/api/v1/star/createStar/fifteen`;
      requestData.fifteenId = selectedStory.fifteen_id;
    }

    try {
      const response = await axios.post(endpoint, requestData, {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          'X-AUTH-TOKEN': token,
        },
      });

      if (response.status === 200) {
        console.log('스토리 읽기를 성공적으로 시작했습니다:', response.data);
        navigation.navigate('StoryInfoReview', { story: selectedStory }); // StoryInfoReview로 이동
      }
    } catch (error) {
      console.error('스토리 읽기 시작 중 에러 발생:', error);
    }
  };

  // 모달의 '취소' 버튼 클릭 시 실행되는 함수
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 스토리 썸네일을 결정하는 함수
  const getThumbnailSource = (story: Story) => {
    switch (story.thumbnail) {
      case 'parasite.jpeg':
        return require('../../assets/images/parasite.jpeg');
      case 'oldboy.jpeg':
        return require('../../assets/images/oldboy.jpeg');
      default:
        return SampleListImg;
    }
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
          <SearchIcon source={require('../../assets/images/searchImg.png')} />
        </SearchContainer>
        <View style={styles.buttonRow}>
          <CategoryButton text="전체" onPress={() => fetchAllCategories()} />
          <CategoryButton
            text="단편"
            onPress={() => fetchStoriesByCategory('단편')}
          />
          <CategoryButton
            text="중편"
            onPress={() => fetchStoriesByCategory('중편')}
          />
          <CategoryButton
            text="장편"
            onPress={() => fetchStoriesByCategory('장편')}
          />
        </View>
        <ScrollView>
          {stories.map((story, index) => (
            <List
              key={index}
              imageSource={getThumbnailSource(story)}
              rank={index + 1}
              title={story.title}
              likes="좋아요 12개"
              endings="앤딩작 5개"
              onPress={() => handleListPress(story)}
            />
          ))}
        </ScrollView>
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
};

// 스타일 정의
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

// styled-components 사용
const SearchContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-bottom-width: 0.5px;
  border-bottom-color: #000;
`;
const SearchIcon = styled.Image`
  width: 14px;
  height: 14px;
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

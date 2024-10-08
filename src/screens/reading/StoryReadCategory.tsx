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

// 타입 정의
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

type RootStackParamList = {
  StoryInfoReview: { story: Story };
};

const StoryReadCategory = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // 상태값
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null); // 선택된 스토리 상태
  const [stories, setStories] = useState<Story[]>([]); // 타입을 Story 배열로 설정
  const [activeCategory, setActiveCategory] = useState<string>('전체');

  useEffect(() => {
    fetchAllCategories(); // 컴포넌트가 처음 마운트될 때 전체 카테고리의 데이터를 가져옴
  }, []);

  const apiUrl = Config.API_URL;

  // 전체 카테고리 데이터를 가져오는 함수
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
      console.error('Error fetching all stories:', error);
    }
  };

  // 카테고리에 따른 데이터를 가져오는 함수
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
      console.error(`Error fetching ${category} stories:`, error);
    }
  };

  // 리스트 항목 클릭 핸들러
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
        const selectedStoryData = response.data;
        console.log('Selected Story:', selectedStoryData);
        setSelectedStory(selectedStoryData); // Set full story for navigation
        setIsModalVisible(true); // Show modal
      } else {
        console.error('No valid ID for the story.');
      }
    } catch (error) {
      console.error('Error fetching story detail:', error);
    }
  };

  const token = useSelector((state: RootState) => state.auth.token);

  // 모달 확인 버튼 핸들러
  const handleConfirm = async () => {
    setIsModalVisible(false);
    if (!selectedStory) return;

    const apiUrl = Config.API_URL;
    let endpoint = '';
    let requestData = {
      fifteenId: 0,
      fiveId: 0,
      tenId: 0,
    };

    // 스토리 ID에 맞게 requestData를 설정합니다.
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
          'X-AUTH-TOKEN': token, // 여기에 실제 토큰을 사용
        },
      });

      if (response.status === 200) {
        console.log('Story read successfully started:', response.data);
        // 성공적으로 API 요청이 완료되면 StoryInfoReview 화면으로 이동
        navigation.navigate('StoryInfoReview', { story: selectedStory });
      }
    } catch (error) {
      console.error('Error starting story read:', error);
      // 실패 시 처리
    }
  };

  // 모달 취소 버튼 핸들러
  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
          <Image
            source={require('../../assets/images/searchImg.png')}
            style={{ width: 14, height: 14 }}
          />
        </SearchContainer>

        <View style={styles.buttonRow}>
          <CategoryButton
            text="전체"
            onPress={() => {
              setActiveCategory('전체');
              fetchAllCategories();
            }}
          />
          <CategoryButton
            text="단편"
            onPress={() => {
              setActiveCategory('단편');
              fetchStoriesByCategory('단편');
            }}
          />
          <CategoryButton
            text="중편"
            onPress={() => {
              setActiveCategory('중편');
              fetchStoriesByCategory('중편');
            }}
          />
          <CategoryButton
            text="장편"
            onPress={() => {
              setActiveCategory('장편');
              fetchStoriesByCategory('장편');
            }}
          />
        </View>
        <ScrollView>
          {stories.map((story, index) => (
            <List
              key={index}
              imageSource={getThumbnailSource(story)}
              rank={index + 1}
              title={story.title}
              likes="좋아요 1.5K" // 임시로 하드코딩
              endings="앤딩작 10개" // 임시로 하드코딩
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

const SearchInput = styled(TextInput)`
  flex: 1;
  color: rgba(0, 0, 0, 0.25);
  font-family: 'Noto Sans KR';
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
`;

export default StoryReadCategory;

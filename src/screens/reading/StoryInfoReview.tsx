import React, { useState } from 'react';
import { Image } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { White10px, White12px, White20px } from '../../components/text/Text';
import { ImgBox } from '../../components/imagecontainer/ImgContainer';
import ReviewComponent from '../../components/review/Review';
import InterestImg from '../../assets/images/interestImg.png';
import ReviewCountImg from '../../assets/images/CountReviewImg.png';
import AndingDetailImg from '../../assets/images/AndingDetailBtn.png';
import LikeBtnImg from '../../assets/images/LikeBtn.png';
import StarBtnImgFull from '../../assets/images/SaveBtn-full.png';
import StarBtnImgEmpty from '../../assets/images/SaveBtn.png';
import Modal from '../../components/modal/Modal';
import SampleListImg from '../../assets/images/SampleListImg.png';
import axios from 'axios';
import Config from 'react-native-config';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
  StoryReadDetail: {
    title: string;
    five_id?: number;
    ten_id?: number;
    fifteen_id?: number;
  };
};

type StoryInfoReviewNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'StoryInfoReview'
>;
type StoryRouteProp = RouteProp<RootStackParamList, 'StoryInfoReview'>;

const API_URL = Config.API_URL;

const StoryInfoReview: React.FC = () => {
  const navigation = useNavigation<StoryInfoReviewNavigationProp>();
  const route = useRoute<StoryRouteProp>();
  const token = useSelector((state: RootState) => state.auth.token);

  const story = route.params?.story;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [isSaved, setIsSaved] = useState(true);

  const handleAndingDetailPress = () => {
    if (story) {
      navigation.navigate('StoryReadDetail', {
        title: story.title,
        five_id: story.five_id,
        ten_id: story.ten_id,
        fifteen_id: story.fifteen_id,
      });
    }
  };

  const getRequestData = (story: Story) => ({
    fifteenId: story.fifteen_id || 0,
    fiveId: story.five_id || 0,
    tenId: story.ten_id || 0,
  });

  const handlePress = async (
    endpoint: string,
    requestData: any,
    successMessage: string,
  ) => {
    try {
      const response = await axios.post(endpoint, requestData, {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
          'X-AUTH-TOKEN': token,
        },
      });

      if (response.status === 200) {
        setModalContent({
          title: successMessage,
          message: `${successMessage}를 완료했습니다.`,
        });
        setModalVisible(true);
      }
    } catch (error) {
      console.error(`Error during ${successMessage}:`, error);
    }
  };

  const handleLikePress = () => {
    if (!story) return;
    const endpoint = `${API_URL}/api/v1/liked/createLikedForAnding/${
      story.five_id ? 'five' : story.ten_id ? 'ten' : 'fifteen'
    }`;
    handlePress(endpoint, getRequestData(story), '좋아요');
  };

  const handleSavePress = () => {
    if (!story) return;
    const endpoint = `${API_URL}/api/v1/star/createStar/${
      story.five_id ? 'five' : story.ten_id ? 'ten' : 'fifteen'
    }`;
    handlePress(
      endpoint,
      getRequestData(story),
      isSaved ? '저장 취소' : '저장',
    );
    setIsSaved(!isSaved);
  };

  const handleConfirm = () => setModalVisible(false);

  if (!story) {
    return (
      <ScrollContainer>
        <InfoPinkBackground>
          <White20px>스토리 데이터를 불러오지 못했습니다.</White20px>
        </InfoPinkBackground>
      </ScrollContainer>
    );
  }

  const getThumbnailSource = () => {
    const thumbnails: { [key: string]: any } = {
      'parasite.jpeg': require('../../assets/images/parasite.jpeg'),
      'oldboy.jpeg': require('../../assets/images/oldboy.jpeg'),
    };
    return thumbnails[story.thumbnail] || SampleListImg;
  };

  return (
    <>
      <ScrollContainer>
        <InfoPinkBackground>
          <ContentContainer>
            <ImgBox
              imageSource={getThumbnailSource()}
              width={105}
              height={131}
              borderRadius={16}
              backgroundColor="#ffd2c3"
            />
            <TextContainer>
              <TitleContainer>
                <White12px>
                  {story.five_id
                    ? '단편'
                    : story.ten_id
                    ? '중편'
                    : story.fifteen_id
                    ? '장편'
                    : '알 수 없음'}
                </White12px>
                <White20px>{story.title}</White20px>
                <White12px>글: 유채빈 외 3명</White12px>
              </TitleContainer>
              <SummaryContainer>
                <SummaryText>{story.description}</SummaryText>
              </SummaryContainer>
              <TagsContainer>
                <TagBox>
                  <TagText>#재미있는</TagText>
                </TagBox>
                <TagBox>
                  <TagText>#앤딩</TagText>
                </TagBox>
              </TagsContainer>
            </TextContainer>
          </ContentContainer>
          <LeftBottomContainer>
            <InterestBox>
              <Image source={InterestImg} />
              <White10px>관심 500개</White10px>
            </InterestBox>
            <ReviewCountBox>
              <Image source={ReviewCountImg} />
              <White10px>리뷰수 400개</White10px>
            </ReviewCountBox>
          </LeftBottomContainer>
          <RightBottomContainer>
            <AndingDetailButton onPress={handleAndingDetailPress}>
              <Image source={AndingDetailImg} />
            </AndingDetailButton>
            <LikeButton onPress={handleLikePress}>
              <Image source={LikeBtnImg} />
            </LikeButton>
            <SaveButton onPress={handleSavePress}>
              <Image source={isSaved ? StarBtnImgFull : StarBtnImgEmpty} />
            </SaveButton>
          </RightBottomContainer>
        </InfoPinkBackground>
        <Container>
          <ReviewComponent />
        </Container>
      </ScrollContainer>
      {modalVisible && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          onConfirm={handleConfirm}
          onCancel={() => {}}
        />
      )}
    </>
  );
};

const InfoPinkBackground = styled.View`
  width: 100%;
  background: #ff7d7d;
  padding-top: 20px;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

const Container = styled.View`
  padding: 16px;
`;

const ContentContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
`;

const TextContainer = styled.View`
  flex: 1;
  padding-left: 16px;
`;

const TitleContainer = styled.View`
  margin-bottom: 16px;
`;

const SummaryContainer = styled.View`
  margin-bottom: 16px;
`;

const SummaryText = styled.Text`
  color: #fff;
  font-family: 'Noto Sans KR';
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
`;

const TagsContainer = styled.View`
  flex-direction: row;
  gap: 3px;
`;

const TagBox = styled.View`
  width: 52px;
  height: 18px;
  border-radius: 5px;
  background: #ff6565;
  justify-content: center;
  align-items: center;
`;

const TagText = styled.Text`
  color: #fff;
  font-family: 'Noto Sans KR';
  font-size: 8px;
  font-style: normal;
  font-weight: 500;
`;

const LeftBottomContainer = styled.View`
  position: absolute;
  bottom: 10px;
  padding-left: 17px;
  flex-direction: row;
  gap: 24px;
`;

const InterestBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ReviewCountBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RightBottomContainer = styled.View`
  gap: 11px;
  left: 240px;
  flex-direction: row;
  align-items: center;
`;

const AndingDetailButton = styled.TouchableOpacity`
  bottom: 13px;
`;

const LikeButton = styled.TouchableOpacity``;

const SaveButton = styled.TouchableOpacity``;

export default StoryInfoReview;

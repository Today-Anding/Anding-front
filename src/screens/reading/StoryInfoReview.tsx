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
import SaveBtnImg from '../../assets/images/SaveBtn.png';
import Modal from '../../components/modal/Modal';
import SampleListImg from '../../assets/images/SampleListImg.png';

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

type StoryRouteProp = RouteProp<RootStackParamList, 'StoryInfoReview'>;

function StoryInfoReview() {
  const navigation = useNavigation();
  const route = useRoute<StoryRouteProp>();

  const story = route.params?.story;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

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

  const handleLikePress = () => {
    setModalContent({
      title: '좋아요',
      message: '좋아요를 눌렀습니다.',
    });
    setModalVisible(true);
  };

  const handleSavePress = () => {
    setModalContent({
      title: '저장',
      message: '앤딩을 저장했습니다.',
    });
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
  };

  if (!story) {
    return (
      <ScrollContainer>
        <InfoPinkBackground>
          <White20px>스토리 데이터를 불러오지 못했습니다.</White20px>
        </InfoPinkBackground>
      </ScrollContainer>
    );
  }

  return (
    <ScrollContainer>
      <InfoPinkBackground>
        <ContentContainer>
          <ImgBox
            imageSource={
              story.thumbnail ? { uri: story.thumbnail } : SampleListImg
            }
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
            <Image source={SaveBtnImg} />
          </SaveButton>
        </RightBottomContainer>
      </InfoPinkBackground>
      <Container>
        <ReviewComponent />
      </Container>

      {modalVisible && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          onConfirm={handleConfirm}
          onCancel={() => {}}
        />
      )}
    </ScrollContainer>
  );
}

const InfoPinkBackground = styled.View`
  width: 100%;
  height: 304px;
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
  flex-direction: row;
  align-items: center;
`;

const AndingDetailButton = styled.TouchableOpacity`
  position: absolute;
  bottom: -75px;
  right: 128px;
`;

const LikeButton = styled.TouchableOpacity`
  position: absolute;
  bottom: -75px;
  right: 72px;
`;

const SaveButton = styled.TouchableOpacity`
  position: absolute;
  bottom: -75px;
  right: 16px;
`;

export default StoryInfoReview;

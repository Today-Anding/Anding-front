import React, { useState } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { White10px, White12px, White20px } from '../../components/text/Text';
import { ImgBox } from '../../components/imagecontainer/ImgContainer';
import SampleListImg from '../../assets/images/SampleListImg.png';
import ReviewComponent from '../../components/review/Review';
import InterestImg from '../../assets/images/interestImg.png';
import ReviewCountImg from '../../assets/images/CountReviewImg.png';
import AndingDetailImg from '../../assets/images/AndingDetailBtn.png';
import LikeBtnImg from '../../assets/images/LikeBtn.png';
import SaveBtnImg from '../../assets/images/SaveBtn.png';
import Modal from '../../components/modal/Modal';

const dummyData = {
  genre: '판타지',
  title: '별에서 온 그대',
  author: '김미희 / 유진희 / 윤비오',
  summary:
    '별에서 온 그대는 외계인과 인간의 사랑을 다룬 이야기로, 우주와 지구를 배경으로 한 아름다운 로맨스를 그립니다. 다양한 갈등과 감동적인 순간들이 어우러져 독자들에게 큰 사랑을 받고 있습니다.',
  tags: ['재미있는', '앤딩을', '지금바로', '여기에서'],
};

const finalImageSource = SampleListImg;

function StoryInfoReview() {
  const navigation = useNavigation();

  // 모달창 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  // '앤딩 디테일' 버튼 클릭 핸들러
  const handleAndingDetailPress = () => {
    navigation.navigate('StoryReadDetail', { title: dummyData.title });
  };

  // '좋아요' 버튼 클릭 핸들러
  const handleLikePress = () => {
    setModalContent({
      title: '좋아요',
      message: '좋아요를 눌렀습니다.',
    });
    setModalVisible(true);
  };

  // '저장' 버튼 클릭 핸들러
  const handleSavePress = () => {
    setModalContent({
      title: '저장',
      message: '앤딩을 저장했습니다.',
    });
    setModalVisible(true);
  };

  // 모달 확인 버튼 클릭 시 모달 닫기
  const handleConfirm = () => {
    setModalVisible(false);
  };

  return (
    <ScrollContainer>
      <InfoPinkBackground>
        <ContentContainer>
          <ImgBox
            imageSource={finalImageSource}
            width={105}
            height={131}
            borderRadius={16}
            backgroundColor="#ffd2c3"
          />
          <TextContainer>
            <TitleContainer>
              <White12px>{dummyData.genre}</White12px>
              <White20px>{dummyData.title}</White20px>
              <White12px>글: {dummyData.author}</White12px>
            </TitleContainer>
            <SummaryContainer>
              <SummaryText>{dummyData.summary}</SummaryText>
            </SummaryContainer>
            <TagsContainer>
              {dummyData.tags.map((tag, index) => (
                <TagBox key={index}>
                  <TagText>#{tag}</TagText>
                </TagBox>
              ))}
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

      {/* 모달창 */}
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

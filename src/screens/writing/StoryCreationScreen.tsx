import React, { useState } from 'react';
import styled from 'styled-components/native';
import { WhiteLogo } from '../../components/logo/Logo';
import { White12px, White16px } from '../../components/text/Text';
import StoryCreateBox from '../../components/storycreatebox/StoryCreateBox';
import Modal from '../../components/modal/Modal';
import axios from 'axios';
import Config from 'react-native-config';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type RootStackParamList = {
  StoryWriteCreate: {
    roomSize: number;
    storyId: string;
    storyTitle: string;
  };
};

const StoryCreationScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'StoryWriteCreate'>>();
  const { roomSize, storyId, storyTitle } = route.params;
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const token = useSelector((state: RootState) => state.auth.token);

  const handleCompleteWriting = () => {
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);
    setShowProcessingModal(true);

    const apiUrl = Config.API_URL;
    let endpoint = '';
    let requestData = {};

    switch (roomSize) {
      case 5:
        endpoint = `${apiUrl}/api/v1/story5/createStory5`;
        requestData = {
          content: content,
          fiveId: storyId,
        };
        break;
      case 10:
        endpoint = `${apiUrl}/api/v1/story10/createStory10`;
        requestData = {
          content: content,
          tenId: storyId,
        };
        break;
      case 15:
        endpoint = `${apiUrl}/api/v1/story15/createStory15`;
        requestData = {
          content: content,
          fifteenId: storyId,
        };
        break;
      default:
        setShowErrorModal(true);
        return;
    }

    if (!token) {
      console.error('No token found');
      setShowErrorModal(true);
      return;
    }

    try {
      console.log('Endpoint:', endpoint);
      console.log('Request Data:', requestData);

      const response = await axios.post(endpoint, requestData, {
        headers: {
          'Content-Type': 'application/json',
          accept: '*/*',
          'X-AUTH-TOKEN': token,
        },
      });

      if (response.status === 200) {
        console.log('Story created successfully');
        setShowSuccessModal(true);
      } else {
        console.error('Unexpected response:', response.status);
        setShowErrorModal(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message);
      } else {
        console.error('Unknown error:', error);
      }
      setShowErrorModal(true);
    } finally {
      setShowProcessingModal(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setShowProcessingModal(false);
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
  };

  const handleErrorConfirm = () => {
    setShowErrorModal(false);
  };

  console.log('storyTitle:', storyTitle);

  return (
    <StorySelectScreenContainer>
      <StorySelectBackground>
        <WhiteLogo />
        <White16px>당신의 앤딩을 작성해주세요.</White16px>
        <White12px>“별에서 온 그대”는 이렇게 끝났습니다.</White12px>
        <White12px>다음은 어떤 이야기일까요?</White12px>
      </StorySelectBackground>
      <WritingBox>
        <TurnTitle>
          <StoryTitle>{storyTitle}</StoryTitle>
          <StoryTurnNum>앤딩의 {storyId}번째 작품</StoryTurnNum>
        </TurnTitle>
        <StoryCreateBox onChangeContent={setContent} content={content} />
        <CompletedWrite onPress={handleCompleteWriting}>
          <ButtonText>작성완료</ButtonText>
        </CompletedWrite>
      </WritingBox>
      {showModal && (
        <Modal
          title="작성한 앤딩을 등록할까요?"
          message=""
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          confirmText="네! 등록할래요"
          cancelText="아니요, 수정할래요"
        />
      )}
      {showProcessingModal && (
        <Modal
          title="AI가 글의 적정성을 판별 중입니다."
          message="잠시만 기다려 주세요."
          onConfirm={() => {}}
          onCancel={handleCancel}
          confirmText=""
          cancelText="취소하기"
        />
      )}
      {showSuccessModal && (
        <Modal
          title="적정성 판별 완료!"
          message="글이 정상적으로 등록 되었습니다."
          onConfirm={handleSuccessConfirm}
          onCancel={() => {}}
          confirmText="확인"
          cancelText=""
        />
      )}
      {showErrorModal && (
        <Modal
          title="등록 실패"
          message="글 등록 중 문제가 발생했습니다. 다시 시도해 주세요."
          onConfirm={handleErrorConfirm}
          onCancel={() => {}}
          confirmText="확인"
          cancelText=""
        />
      )}
    </StorySelectScreenContainer>
  );
};

export default StoryCreationScreen;

const StorySelectScreenContainer = styled.View`
  flex: 1;
  background-color: white;
  gap: 16px;
  align-items: center;
`;

const StorySelectBackground = styled.View`
  width: 100%;
  height: 35%;
  background: #ff7d7d;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const WritingBox = styled.ScrollView``;

const TurnTitle = styled.View`
  align-self: flex-start;
  padding-left: 10px;
  gap: 3px;
  margin-bottom: 6px;
`;

const StoryTitle = styled.Text`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
`;

const StoryTurnNum = styled.Text`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 8px;
  font-style: normal;
  font-weight: 300;
`;

const CompletedWrite = styled.TouchableOpacity`
  width: 88px;
  height: 29px;
  border-radius: 10px;
  border: 1px solid #ff9d9d;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 5px;
`;

const ButtonText = styled.Text`
  color: #000;
  text-align: center;
  font-family: 'Noto Sans KR';
  font-size: 8px;
  font-style: normal;
  font-weight: 300;
`;

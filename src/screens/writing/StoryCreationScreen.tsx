import React, { useState } from 'react';
import styled from 'styled-components/native';
import { WhiteLogo } from '../../components/logo/Logo';
import { White12px, White16px } from '../../components/text/Text';
import StoryCreateBox from '../../components/storycreatebox/StoryCreateBox';
import Modal from '../../components/modal/Modal';

const StoryCreationScreen: React.FC = () => {
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCompleteWriting = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    setShowProcessingModal(true);

    setTimeout(() => {
      setShowProcessingModal(false);
      setShowSuccessModal(true);
    }, 3000);
  };

  const handleCancel = () => {
    setShowModal(false);
    setShowProcessingModal(false);
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
  };

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
          <StoryTitle>별에서 온 그대</StoryTitle>
          <StoryTurnNum>3번째 이야기</StoryTurnNum>
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
  margin-top: 10px;
`;
const ButtonText = styled.Text`
  color: #000;
  text-align: center;
  font-family: 'Noto Sans KR';
  font-size: 8px;
  font-style: normal;
  font-weight: 300;
`;

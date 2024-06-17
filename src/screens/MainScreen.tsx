import React from 'react';
import styled from 'styled-components/native';
import {WhiteLogo} from '../components/Logo';
import {Img139pxBox, Img85pxBox} from '../components/ImgContainer';
import {
  Black14px,
  Black16px,
  Pink12px,
  Pink16px,
  White12px,
  White16px,
} from '../components/Text';
import CarouselComponent from '../components/CarouselComponent';

const MainScreenBackgroundPink = styled.View`
  flex: 0.5;
  background: #ff9999;
`;
const MainScreenBackgroundWhite = styled.View`
  flex: 0.5;
  background: #ffffff;
`;
const ImgContainer = styled.View`
  flex: 1;
  flex-direction: row; /* 올바른 속성명을 사용하세요 */
`;
const MainSelectBox = styled.TouchableOpacity`
  width: 338px;
  height: 123px;
  color: rgba(255, 255, 255, 0.6); /* 텍스트 색상 */
  border-width: 2px; /* 테두리 너비 */
  border-color: rgba(255, 60, 142, 0.3); /* 테두리 색상 */
  elevation: 5; /* 박스 그림자 */
  shadow-color: rgba(255, 255, 255, 0.25); /* 그림자 색상 */
  shadow-offset: 50px 50px; /* 그림자 offset */
  shadow-opacity: 1; /* 그림자 불투명도 */
  shadow-offset: 50px 50px; /* 그림자 offset */
`;
const MainMyAnding = styled.TouchableOpacity`
  width: 158px;
  height: 100px;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.6);
  stroke-width: 2px;
  stroke: rgba(255, 60, 142, 0.3);
  filter: drop-shadow(3px 4px 10.9px rgba(255, 141, 141, 0.25));
  backdrop-filter: blur(15px);
`;
export function MainScreen() {
  return (
    <>
      <MainScreenBackgroundPink>
        <WhiteLogo />
        <ImgContainer>
          <Img139pxBox />
          <Img139pxBox />
          <Img139pxBox />
        </ImgContainer>
        <CarouselComponent />
        <White16px>오늘은 어떤 스토리를 작성할까요?</White16px>
        <White12px>이어 쓸 스토리를 선택해주세요!</White12px>
      </MainScreenBackgroundPink>
      <MainSelectBox>
        <Img85pxBox />
        <Pink16px>이어쓰기</Pink16px>
        <Pink16px>새앤딩 쓰기</Pink16px>
      </MainSelectBox>
      <MainScreenBackgroundWhite>
        <Black16px>나의 Anding</Black16px>
        <MainMyAnding>
          <Black14px>별에서 온 그대</Black14px>
          <Pink12px>Anding다시 보기</Pink12px>
        </MainMyAnding>
        <MainMyAnding>
          <Black14px>별에서 온 그대</Black14px>
          <Pink12px>Anding다시 보기</Pink12px>
        </MainMyAnding>
      </MainScreenBackgroundWhite>
    </>
  );
}

export default MainScreen;

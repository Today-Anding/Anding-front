import React from 'react';
import styled from 'styled-components/native';
import GobackButton from '../../components/button/GobackButton';
import {
  Black10px,
  Black12pxLight,
  Black16px,
  Black24pxBold,
  Gray10px,
} from '../../components/text/Text';
import MyPageCarousel from '../../components/carousel/MypageCarousel';

function MyPage() {
  return (
    <MypageContainer>
      <GobackBox>
        <GobackButton />
      </GobackBox>
      <WhiteMypageBackground>
        <MypageContent>
          <MypageInfo>
            <MypageInfoLeft>
              <Black24pxBold>홍길동</Black24pxBold>
              <Gray10px>사용자@이메일.co.kr</Gray10px>
            </MypageInfoLeft>
            <Black10px>회원 정보 변경</Black10px>
          </MypageInfo>
          <MypageListBox>
            <Black12pxLight>내가 쓰고있는 글</Black12pxLight>
            <MypageStroke>
              <Black10px>리스트</Black10px>
            </MypageStroke>
            <Black12pxLight>내가 좋아요 한 글</Black12pxLight>
            <MypageStroke>
              <Black10px>리스트</Black10px>
            </MypageStroke>
          </MypageListBox>
        </MypageContent>
        <MypageCarouselBox>
          <Black16px>앤딩 조회 내역</Black16px>
          <MyPageCarousel />
        </MypageCarouselBox>
      </WhiteMypageBackground>
    </MypageContainer>
  );
}

const MypageContainer = styled.View`
  flex: 1;
  background: #ff7d7d;
`;
const GobackBox = styled.View`
  padding: 23px;
`;
const WhiteMypageBackground = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 611px;
  background-color: #fff;
  border-radius: 30px 30px 0 0;
  padding-top: 20px;
  overflow: hidden;
`;

const MypageContent = styled.View`
  padding-top: 20px;
  padding-left: 61px;
  padding-right: 20px;
`;

const MypageInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 26px;
  gap: 123px;
`;

const MypageInfoLeft = styled.View`
  gap: 4px;
`;

const MypageListBox = styled.View`
  margin-bottom: 26px;
`;

const MypageStroke = styled.View`
  width: 275px;
  height: 72px;
  border-top-width: 1px;
  border-top-color: #ff7d7d;
  background-color: #fff;
  margin-bottom: 4px;
`;

const MypageCarouselBox = styled.View`
  align-items: center;
`;

export default MyPage;

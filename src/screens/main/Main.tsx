import React, { useState } from 'react';
import styled from 'styled-components/native';
import { WhiteLogo } from '../../components/logo/Logo';
import Carousel from '../../components/carousel/Carousel';
import {
  Black14px,
  Black16px,
  Pink12px,
  White12px,
  White16px,
} from '../../components/text/Text';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SideNav from '../../components/sidenav/SideNav';

const Main: React.FC = () => {
  const navigation = useNavigation();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Carousel items
  const carouselItems = [
    { imageSource: require('../../assets/images/Carousel1.png') },
    { imageSource: require('../../assets/images/Carousel2.png') },
    { imageSource: require('../../assets/images/Carousel3.png') },
  ];

  return (
    <MainScreen>
      <MainScreenBackgroundPink>
        <HeaderBox>
          <LogoWrapper>
            <WhiteLogo />
          </LogoWrapper>
          <HamburgerButton onPress={() => setSidebarVisible(!sidebarVisible)}>
            <Image
              source={require('../../assets/images/Hamburger.png')}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: 24, height: 24 }}
            />
          </HamburgerButton>
        </HeaderBox>
        <Carousel items={carouselItems} />
        <White16px>오늘은 어떤 스토리를 작성할까요?</White16px>
        <White12px>이어 쓸 스토리를 선택해주세요!</White12px>
      </MainScreenBackgroundPink>
      <BoxContainer>
        <ImageWrapper>
          <Image source={require('../../assets/images/MainSample1.png')} />
        </ImageWrapper>
        <TextContainer>
          <TouchableOpacity
            onPress={() => navigation.navigate('StoryWriteSelect')}
          >
            <TopText>Anding 읽기</TopText>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            onPress={() => navigation.navigate('StoryWriteSelect')}
          >
            <BottomText>새 Anding 쓰기</BottomText>
          </TouchableOpacity>
        </TextContainer>
      </BoxContainer>
      <MainScreenBackgroundWhite>
        <HeaderContainer>
          <Black16px>나의 Anding</Black16px>
        </HeaderContainer>
        <GridContainer>
          {[...Array(4)].map((_, index) => (
            <MainMyAnding key={index}>
              <Black14px>별에서 온 그대</Black14px>
              <SmallDivider />
              <Pink12px>Anding 다시 보기</Pink12px>
            </MainMyAnding>
          ))}
        </GridContainer>
      </MainScreenBackgroundWhite>
      <SideNav
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
      />
    </MainScreen>
  );
};

export default React.memo(Main);

// Styled Components
const MainScreen = styled.View`
  flex: 1;
  background-color: white;
`;

const MainScreenBackgroundPink = styled.View`
  flex: 1;
  background: #ff7d7d;
  align-items: center;
  z-index: 1;
`;

const HeaderBox = styled.View`
  flex-direction: row;
  padding-left: 110px;
`;

const LogoWrapper = styled.View`
  margin-top: 32px;
`;

const HamburgerButton = styled.TouchableOpacity`
  margin-top: 32px;
  margin-left: 90px;
`;

const BoxContainer = styled.View`
  width: 338px;
  height: 123px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.756);
  border-width: 2px;
  border-color: rgba(255, 60, 142, 0.3);
  border-radius: 30px;
  backdrop-filter: blur(15px);
  margin-top: -50px;
  align-self: center;
  z-index: 2;
`;

const ImageWrapper = styled.View`
  width: 85px;
  height: 85px;
  margin-left: 20px;
  margin-right: 21.5px;
`;

const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TopText = styled.Text`
  color: #ff7070;
  text-align: center;
  font-family: 'Noto Sans KR';
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const BottomText = styled.Text`
  color: #ff7070;
  text-align: center;
  font-family: 'Noto Sans CJK KR';
  font-size: 15px;
  font-weight: 700;
`;

const Divider = styled.View`
  width: 174px;
  height: 1px;
  background-color: #fcc;
  margin: 0 10px;
  margin-bottom: 10px;
`;

const MainScreenBackgroundWhite = styled.View`
  flex: 1;
  align-items: center;
`;

const HeaderContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  margin-top: 12px;
  margin-left: 80px;
  margin-bottom: 20px;
`;

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const SmallDivider = styled.View`
  width: 130px;
  height: 1px;
  background-color: #fcc;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const MainMyAnding = styled.TouchableOpacity`
  width: 158px;
  height: 100px;
  margin: 10px;
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: rgba(255, 60, 142, 0.3);
  border-radius: 13px;
  box-shadow: 3px 4px 10.9px rgba(255, 141, 141, 0.25);
  backdrop-filter: blur(15px);
  background-color: rgb(255, 255, 255);
`;

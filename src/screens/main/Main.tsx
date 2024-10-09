import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import axios from 'axios';
import { WhiteLogo } from '../../components/logo/Logo';
import MainCarousel from '../../components/carousel/Carousel';
import {
  Black14px,
  Black17px,
  Black17pxBold,
  Pink12px,
  White12px,
  White16px,
  White16pxBold,
} from '../../components/text/Text';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SideNav from '../../components/sidenav/SideNav';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';
import Config from 'react-native-config';
import { RootStackParamList } from '../../types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'StoryReadCategory'
>;

const Main: React.FC = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [recentTitles, setRecentTitles] = useState<string[]>([]);

  const handleLogout = () => {
    dispatch(logout());
    setSidebarVisible(false);
  };

  useFocusEffect(
    useCallback(() => {
      setSidebarVisible(false);
    }, []),
  );

  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchRecentTitles = async () => {
      try {
        const apiUrl = Config.API_URL;
        const response = await axios.get(
          `${apiUrl}/api/v1/star/getTop4RecentStar`,
          {
            headers: {
              'X-AUTH-TOKEN': token,
              accept: '*/*',
            },
          },
        );

        const titles = response.data.items.map((item: any) => item.title);
        setRecentTitles(titles);
      } catch (error) {
        console.error('Error fetching recent titles:', error);
      }
    };

    fetchRecentTitles();
  }, [token]);

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
            <HamburgerIcon
              source={require('../../assets/images/Hamburger.png')}
            />
          </HamburgerButton>
        </HeaderBox>
        <MainCarousel items={carouselItems} />
        <MainText>
          <White16px>
            오늘은 어떤 <White16pxBold>스토리</White16pxBold>를 작성할까요?
          </White16px>
          <White12px>이어 쓸 스토리를 선택해주세요!</White12px>
        </MainText>
      </MainScreenBackgroundPink>
      <BoxContainer>
        <ImageWrapper>
          <MainImage source={require('../../assets/images/MainSample1.png')} />
        </ImageWrapper>
        <TextContainer>
          <Button onPress={() => navigation.navigate('StoryReadCategory')}>
            <TopText>Anding 읽기</TopText>
          </Button>
          <Divider />
          <Button onPress={() => navigation.navigate('StoryWriteSelect')}>
            <BottomText>새 Anding 쓰기</BottomText>
          </Button>
        </TextContainer>
      </BoxContainer>
      <MainScreenBackgroundWhite>
        <HeaderContainer>
          <Black17px>
            나의 <Black17pxBold>Anding</Black17pxBold>
          </Black17px>
        </HeaderContainer>
        <GridContainer>
          {recentTitles.map((title, index) => (
            <MainMyAnding key={index}>
              <Black14px>{title}</Black14px>
              <SmallDivider />
              <Pink12px>Anding 다시 보기</Pink12px>
            </MainMyAnding>
          ))}
        </GridContainer>
      </MainScreenBackgroundWhite>
      <SideNav
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
    </MainScreen>
  );
};

export default React.memo(Main);

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

const MainText = styled.View`
  gap: 10px;
  align-items: center;
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

const HamburgerIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const BoxContainer = styled.View`
  width: 338px;
  height: 123px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.867);
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

const MainImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Button = styled.TouchableOpacity``;

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
  margin-top: 5px;
  margin-bottom: 5px;
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
  shadow-color: #ff9797;
  shadow-offset: {
    width: 4px;
    height: 4px;
  }
  shadow-opacity: 0.35;
  shadow-radius: 3.84px;
  elevation: 5;
`;

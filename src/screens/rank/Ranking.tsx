import React, { useState } from 'react';
import styled from 'styled-components/native';
import { WhiteLogo } from '../../components/logo/Logo';
import SideNav from '../../components/sidenav/SideNav';
import { Image, TouchableOpacity, ScrollView, View } from 'react-native';
import {
  Black10pxMid,
  Black20px,
  Black24px,
  Black24pxBold,
  Pink5px,
} from '../../components/text/Text';
import { List } from '../../components/list/List';
import SampleListImg from '../../assets/images/SampleListImg.png';

function Ranking() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedBox, setSelectedBox] = useState('cumulative');

  return (
    <RankingScreen>
      <RankingPinkBackground>
        <RankingHead>
          <WhiteLogo />
          <HamburgerButton onPress={() => setSidebarVisible(!sidebarVisible)}>
            <Image
              source={require('../../assets/images/Hamburger.png')}
              style={{ width: 24, height: 24 }}
            />
          </HamburgerButton>
        </RankingHead>
        <BigWhiteBox>
          <BigWhiteBoxLeft>
            <Black20px>
              오늘의 <Black24pxBold>앤딩 랭킹</Black24pxBold>을
            </Black20px>
            <Black20px>확인하세요</Black20px>
            <SmallGray7>지금 핫한 앤딩을 만나보세요!</SmallGray7>
          </BigWhiteBoxLeft>
          <Image source={require('../../assets/images/RankingImg.png')} />
        </BigWhiteBox>
        <SmallWhiteBox>
          <RowContainer onPress={() => setSelectedBox('cumulative')}>
            <Image
              source={require('../../assets/images/CumulativeRankImg.png')}
            />
            <SmallWhiteBoxTextBox>
              <Pink5px>TODAY’S ANDING</Pink5px>
              <Black10pxMid>누적랭킹</Black10pxMid>
            </SmallWhiteBoxTextBox>
          </RowContainer>
          <Image
            source={require('../../assets/images/SmallWhiteBoxStroke.png')}
          />
          <RowContainer onPress={() => setSelectedBox('writer')}>
            <Image source={require('../../assets/images/WriterRankImg.png')} />
            <SmallWhiteBoxTextBox>
              <Pink5px>TODAY’S ANDING</Pink5px>
              <Black10pxMid>작가랭킹</Black10pxMid>
            </SmallWhiteBoxTextBox>
          </RowContainer>
        </SmallWhiteBox>
      </RankingPinkBackground>
      <SideNav
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        isLoggedIn={false}
        onLogout={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <ScrollViewContainer>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {selectedBox === 'cumulative' && (
            <View>
              <TextContent>누적 랭킹</TextContent>
              {[...Array(10)].map((_, i) => (
                <List
                  key={i}
                  imageSource={SampleListImg}
                  rank={i + 1}
                  title="별에서 온 그대"
                  likes="좋아요 1.5K"
                  endings="앤딩작 10개"
                  onPress={() => console.log('List item pressed')}
                />
              ))}
            </View>
          )}
          {selectedBox === 'writer' && (
            <View>
              <TextContent>작가 랭킹</TextContent>
              {[...Array(10)].map((_, i) => (
                <List
                  key={i}
                  imageSource={SampleListImg}
                  rank={i + 1}
                  title="유채은"
                  likes="좋아요 1.5K"
                  endings="앤딩작 10개"
                  onPress={() => console.log('List item pressed')}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </ScrollViewContainer>
    </RankingScreen>
  );
}

export default Ranking;

const RankingScreen = styled.View`
  flex: 1;
  background-color: white;
`;

const RankingPinkBackground = styled.View`
  flex: 0.6;
  background: #ff7d7d;
  align-items: center;
`;

const RankingHead = styled.View`
  padding-top: 30px;
  padding-left: 100px;
  flex-direction: row;
  align-items: center;
`;
const HamburgerButton = styled.TouchableOpacity`
  margin-left: 100px;
`;

const BigWhiteBox = styled.View`
  width: 354px;
  height: 151px;
  flex-shrink: 0;
  border-radius: 15px;
  background: #fff;
  margin-top: 21px;
  padding-left: 23px;
  padding-top: 26px;
  flex-direction: row;
`;
const BigWhiteBoxLeft = styled.View`
  padding-right: 25px;
`;
const SmallGray7 = styled.Text`
  color: #a3a3a3;
  font-family: 'Noto Sans KR';
  font-size: 7px;
  font-style: normal;
  font-weight: 400;
`;

const SmallWhiteBox = styled.View`
  width: 354px;
  height: 62px;
  border-radius: 15px;
  background: #fff;
  gap: 30px;
  flex-direction: row;
  margin-top: 9px;
  align-items: center;
  padding: 9px;
  justify-content: center;
`;

const RowContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const SmallWhiteBoxTextBox = styled.View`
  flex-direction: column;
  text-align: center;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
`;
const ScrollViewContainer = styled.View`
  flex: 1;
  padding-top: 7px;
  align-items: center;
`;

const TextContent = styled.Text`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 10px;
`;

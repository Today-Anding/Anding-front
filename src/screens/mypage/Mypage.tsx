import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import GobackButton from '../../components/button/GobackButton';
import {
  Black12pxLight,
  Black16px,
  Black24pxBold,
} from '../../components/text/Text';
import MyPageCarousel from '../../components/carousel/MypageCarousel';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Config from 'react-native-config';

interface UserInfo {
  name: string;
  account: string;
  gender: string;
  nickname: string;
  phone: string;
}

function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!token) {
        console.error('Token is missing');
        return;
      }

      try {
        const apiUrl = Config.API_URL;
        const response = await axios.get(`${apiUrl}/api/v1/user/getUser`, {
          headers: {
            'X-AUTH-TOKEN': token,
            accept: '*/*',
          },
        });

        const { name, account, gender, nickname, phone } = response.data;
        setUserInfo({ name, account, gender, nickname, phone });
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, [token]);

  return (
    <MypageContainer>
      <GobackBox>
        <GobackButton />
      </GobackBox>
      <WhiteMypageBackground>
        <MypageContent>
          <MypageInfo>
            <MypageInfoLeft>
              {userInfo ? (
                <>
                  <Black24pxBold>{userInfo.name}</Black24pxBold>
                  <Black12pxLight>닉네임 : {userInfo.account}</Black12pxLight>
                  <Black12pxLight>성별: {userInfo.gender}</Black12pxLight>
                  <Black12pxLight>닉네임: {userInfo.nickname}</Black12pxLight>
                  <Black12pxLight>전화번호: {userInfo.phone}</Black12pxLight>
                </>
              ) : (
                <Black16px>로딩 중...</Black16px>
              )}
            </MypageInfoLeft>
          </MypageInfo>
          <Divider />
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
  gap: 10px;
`;

const Divider = styled.View`
  height: 1px;
  width: 90%;
  background-color: #ff7d7d;
  margin-top: 20px;
`;

const MypageCarouselBox = styled.View`
  margin-top: 50px;
  align-items: center;
`;

export default MyPage;

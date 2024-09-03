import React from 'react';
import styled from 'styled-components/native';
import { Img70pxBox } from '../imagecontainer/ImgContainer';
import { Black10px, Black14px } from '../text/Text';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ImageSourcePropType, TouchableOpacityProps } from 'react-native';
import SampleListImg from '../../assets/images/SampleListImg.png'; // 대체 이미지

// Props 타입 정의
type ListProps = {
  imageSource?: ImageSourcePropType; // 이미지 소스는 선택 사항으로 변경
  rank: number;
  title: string;
  likes: string;
  endings: string;
  onPress: () => void; // 클릭 시 호출할 핸들러 추가
};

const ListDiv = styled.TouchableOpacity`
  width: 271px;
  height: 85px;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: #fff5f5;
  padding: 10px;
  margin-top: 20px;
`;

const LankDiv = styled.View`
  width: 24px;
  height: 24px;
  align-items: center;
  border-radius: 24px;
  border: 1px solid #000;
  margin-left: 12px;
`;

const TextContainer = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: 12px;
`;

// List 컴포넌트 정의
export function List({
  imageSource,
  rank,
  title,
  likes,
  endings,
  onPress,
}: ListProps) {
  // 이미지 소스가 없는 경우 대체 이미지 사용
  const finalImageSource = imageSource || SampleListImg;

  return (
    <ListDiv onPress={onPress}>
      <Img70pxBox imageSource={finalImageSource} />
      <LankDiv>
        <Black14px>{rank}</Black14px>
      </LankDiv>
      <TextContainer>
        <Black10px>{title}</Black10px>
        <Black10px>{likes}</Black10px>
        <Black10px>{endings}</Black10px>
      </TextContainer>
    </ListDiv>
  );
}

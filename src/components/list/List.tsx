import styled from 'styled-components/native';
import { Img70pxBox } from '../imagecontainer/ImgContainer';
import { Black10px, Black14px } from '../text/Text';

const ListDiv = styled.View`
  width: 271px;
  height: 85px;
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: #fff5f5;
  padding: 10px;
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

export function List() {
  return (
    <ListDiv>
      <Img70pxBox />
      <LankDiv>
        <Black14px>1</Black14px>
      </LankDiv>
      <TextContainer>
        <Black10px>별에서 온 그대</Black10px>
        <Black10px>좋아요1.5K</Black10px>
        <Black10px>앤딩작 10개</Black10px>
      </TextContainer>
    </ListDiv>
  );
}

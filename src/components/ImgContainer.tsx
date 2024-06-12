/* eslint-disable react/react-in-jsx-scope */
import {Image} from 'react-native';
import styled from 'styled-components/native';

const Img70pxContainer = styled.TouchableOpacity`
  display: flex;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #ffd2c3;
`;

const Img85pxContainer = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Img100pxContainer = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  border-radius: 16px;
`;

const Img139pxContainer = styled.TouchableOpacity`
  width: 139px;
  height: 139px;
  border-radius: 15px;
`;

export function Img70pxBox() {
  return (
    <Img70pxContainer>
      <Image source={require('../assets/images/SampleListImg.png')} />
    </Img70pxContainer>
  );
}

export function Img85pxBox() {
  return (
    <Img85pxContainer>
      <Image source={require('../assets/images/SampleListImg.png')} />
    </Img85pxContainer>
  );
}

export function Img100pxBox() {
  return (
    <Img100pxContainer>
      <Image source={require('../assets/images/SampleSidenavImg.png')} />
    </Img100pxContainer>
  );
}

export function Img139pxBox() {
  return (
    <Img139pxContainer>
      <Image source={require('../assets/images/SampleSidenavImg.png')} />
    </Img139pxContainer>
  );
}

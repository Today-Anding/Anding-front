/* eslint-disable react/react-in-jsx-scope */
import { Image, ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';

// Base Image Container Component
interface ImgBoxProps {
  imageSource: ImageSourcePropType;
  width: number;
  height: number;
  borderRadius: number;
  backgroundColor?: string;
}

const ImgBoxContainer = styled.TouchableOpacity<{
  width: number;
  height: number;
  borderRadius: number;
  backgroundColor?: string;
}>`
  display: flex;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  justify-content: center;
  align-items: center;
  border-radius: ${props => props.borderRadius}px;
  background: ${props => props.backgroundColor || 'transparent'};
`;

// Generic Image Component
export function ImgBox({
  imageSource,
  width,
  height,
  borderRadius,
  backgroundColor,
}: ImgBoxProps) {
  return (
    <ImgBoxContainer
      width={width}
      height={height}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
    >
      <Image source={imageSource} style={{ width, height, borderRadius }} />
    </ImgBoxContainer>
  );
}

// Specific Image Components
interface SpecificImgProps {
  imageSource: ImageSourcePropType;
}

export function Img70pxBox({ imageSource }: SpecificImgProps) {
  return (
    <ImgBox
      imageSource={imageSource}
      width={70}
      height={70}
      borderRadius={16}
      backgroundColor="#ffd2c3"
    />
  );
}

export function Img85pxBox({ imageSource }: SpecificImgProps) {
  return (
    <ImgBox
      imageSource={imageSource}
      width={85}
      height={85}
      borderRadius={15}
    />
  );
}

export function Img100pxBox({ imageSource }: SpecificImgProps) {
  return (
    <ImgBox
      imageSource={imageSource}
      width={100}
      height={100}
      borderRadius={16}
    />
  );
}

export function Img139pxBox({ imageSource }: SpecificImgProps) {
  return (
    <ImgBox
      imageSource={imageSource}
      width={139}
      height={139}
      borderRadius={15}
    />
  );
}

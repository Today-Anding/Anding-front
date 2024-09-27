import React, { FC } from 'react';
import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

interface StorySelectBoxProps {
  title: string;
}

const StorySelectBoxContainer = styled.View`
  width: 324px;
  height: 90px;
  background-color: rgba(255, 255, 255, 0.6);
  border-width: 2px;
  border-color: rgba(255, 60, 142, 0.3);
  border-radius: 13px;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  padding: 10px;
`;

const StorySelectBoxStroke = styled.View`
  width: 266px;
  height: 0px;
  flex-shrink: 0;
  border-width: 1px;
  border-color: #fcc;
  margin-top: 8px;
`;

const StorySelectBoxInnerContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const StorySelectBoxText = styled.Text`
  color: #000;
  font-family: 'NotoSansKR';
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
`;

const StorySelectBoxSubtitle = styled.Text`
  color: #ff7070;
  font-family: 'NotoSansKR';
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  margin-top: 8px;
`;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.8, // Adjusted opacity
    shadowRadius: 5, // Adjusted radius
    elevation: 5, // Android elevation
  },
});

const StorySelectBox: FC<StorySelectBoxProps> = ({ title }) => {
  return (
    <StorySelectBoxContainer style={styles.shadow}>
      <StorySelectBoxInnerContainer>
        <StorySelectBoxText>{title}</StorySelectBoxText>
        <StorySelectBoxStroke />
        <StorySelectBoxSubtitle>Anding 이어쓰기</StorySelectBoxSubtitle>
      </StorySelectBoxInnerContainer>
    </StorySelectBoxContainer>
  );
};

export default StorySelectBox;

import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Black14px, Pink12px } from '../text/Text';
import { StyleSheet } from 'react-native';

interface StorySelectBoxProps {
  title: string;
}

const StorySelectBoxContainer = styled.TouchableOpacity`
  width: 324px;
  height: 90px;
  background-color: rgba(255, 255, 255, 0.6);
  border-width: 2px;
  border-color: rgba(255, 60, 142, 0.3);
  border-radius: 13px;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

const StorySelectBoxStroke = styled.View`
  width: 266.582px;
  height: 0px;
  flex-shrink: 0;
  border-width: 1px;
  border-color: #fcc;
  margin-top: 8px;
`;

const StorySelectBoxInnerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StorySelectBoxText = styled(Black14px)`
  text-align: center;
`;

const StorySelectBoxSubtitle = styled(Pink12px)`
  margin-top: 8px;
`;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgba(255, 255, 255, 0.25)',
    shadowOffset: {
      width: 50,
      height: 50,
    },
    shadowOpacity: 1,
    shadowRadius: 200,
    elevation: 5,
  },
});

const StorySelectBox: FC<StorySelectBoxProps> = ({ title }) => {
  return (
    <StorySelectBoxContainer style={styles.shadow}>
      <StorySelectBoxInnerContainer>
        <StorySelectBoxText>{title}</StorySelectBoxText>
        <StorySelectBoxStroke />
        <StorySelectBoxSubtitle>Anding 다시보기</StorySelectBoxSubtitle>
      </StorySelectBoxInnerContainer>
    </StorySelectBoxContainer>
  );
};

export default StorySelectBox;

import React, { FC } from 'react';
import styled from 'styled-components/native';
import { TextInput } from 'react-native';

interface StorySelectBoxProps {
  content: string;
  onChangeContent: (text: string) => void;
}

const StorySelectBox: FC<StorySelectBoxProps> = ({
  content,
  onChangeContent,
}) => {
  const handleChange = (text: string) => {
    if (text.length <= 5000) {
      onChangeContent(text);
    }
  };

  return (
    <StorySelectBoxContainer>
      <StoryCreateStroke />
      <StorySelectBoxInnerContainer>
        <StorySelectBoxTextInput
          value={content}
          onChangeText={handleChange}
          placeholder="다음 앤딩을 작성해주세요"
          multiline
          textAlignVertical="top"
        />
      </StorySelectBoxInnerContainer>
      <StoryCreateStroke />
      <CharacterCount>{content.length} / 5000</CharacterCount>
    </StorySelectBoxContainer>
  );
};

export default StorySelectBox;

const StorySelectBoxContainer = styled.View`
  width: 348px;
  height: 396px;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
`;

const StorySelectBoxInnerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StorySelectBoxTextInput = styled(TextInput)`
  width: 100%;
  height: 100%;
  padding: 16px;
  font-size: 14px;
  color: #000;
  text-align: left;
`;

const StoryCreateStroke = styled.View`
  width: 343px;
  height: 1px;
  background: #ff9d9d;
`;

const CharacterCount = styled.Text`
  position: absolute;
  bottom: 8px;
  right: 16px;
  color: #000;
  font-size: 12px;
  font-family: 'Noto Sans KR';
`;

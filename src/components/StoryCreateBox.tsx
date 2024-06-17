import React, {FC} from 'react';
import styled from 'styled-components/native';
import {StyleSheet, TextInput} from 'react-native';

interface StorySelectBoxProps {
  title: string;
}

const StorySelectBoxContainer = styled.View`
  width: 350.137px;
  height: 500.203px;
  background-color: #ffffff;
  border-width: 2px;
  border-color: rgba(255, 60, 142, 0.3);
  border-radius: 13px;
  margin-top: 200px;
`;

const StorySelectBoxInnerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StorySelectBoxTextInput = styled(TextInput)`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  text-align: center;
  font-size: 14px;
  color: #000;
`;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
});

const StorySelectBox: FC<StorySelectBoxProps> = ({title}) => {
  return (
    <StorySelectBoxContainer style={styles.shadow}>
      <StorySelectBoxInnerContainer>
        <StorySelectBoxTextInput
          defaultValue={title}
          placeholder="Enter title here"
        />
      </StorySelectBoxInnerContainer>
    </StorySelectBoxContainer>
  );
};

export default StorySelectBox;

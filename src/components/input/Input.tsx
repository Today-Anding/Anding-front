import React from 'react';
import styled from 'styled-components/native';

type TextInputWrapperProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
};

const Container = styled.View`
  width: 306px;
  height: 58px;
`;

const Label = styled.Text`
  color: #333;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
`;

const StyledInput = styled.TextInput`
  display: flex;
  width: 306px;
  height: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const Inputtext: React.FC<TextInputWrapperProps> = ({
  label,
  value,
  onChangeText,
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledInput value={value} onChangeText={onChangeText} />
    </Container>
  );
};

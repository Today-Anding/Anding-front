import React from 'react';
import styled from 'styled-components/native';
import { TextInputProps } from 'react-native';

type InputtextProps = TextInputProps & {
  label: string;
};

const Container = styled.View`
  width: 306px;
  height: 58px;
  margin-bottom: 10px;
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

export const Inputtext: React.FC<InputtextProps> = ({ label, ...props }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <StyledInput {...props} />
    </Container>
  );
};

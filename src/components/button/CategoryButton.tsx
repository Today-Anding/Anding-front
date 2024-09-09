import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

type CategoryButtonProps = {
  text: string;
  onPress: () => void;
};

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  text,
  onPress,
}) => {
  return (
    <StyledCategoryButton onPress={onPress}>
      <CategoryButtonText>{text}</CategoryButtonText>
    </StyledCategoryButton>
  );
};

const StyledCategoryButton = styled.TouchableOpacity`
  display: flex;
  width: 55px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 27px;
  border: 1px solid rgba(255, 78, 78, 0.3);
`;

const CategoryButtonText = styled(Text)`
  color: #000;
  font-size: 10px;
  text-align: center;
`;

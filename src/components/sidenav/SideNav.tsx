import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const SideNav: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  const navigation = useNavigation();

  if (!visible) return null;

  return (
    <SidebarContainer>
      <CloseButton onPress={onClose}>X</CloseButton>
      <Button onPress={() => navigation.navigate('Details1')}>
        <ButtonText>Anding 읽기 1</ButtonText>
      </Button>
      <Button onPress={() => navigation.navigate('Details2')}>
        <ButtonText>Anding 읽기 2</ButtonText>
      </Button>
      <Button onPress={() => navigation.navigate('Details3')}>
        <ButtonText>Anding 읽기 3</ButtonText>
      </Button>
      <Button onPress={() => navigation.navigate('Details4')}>
        <ButtonText>Anding 읽기 4</ButtonText>
      </Button>
    </SidebarContainer>
  );
};

export default SideNav;

const SidebarContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  background-color: #fff;
  border-right-width: 1px;
  border-right-color: #ccc;
  padding: 20px;
  z-index: 1000;
`;

const CloseButton = styled.Text`
  font-size: 24px;
  color: #000;
  text-align: right;
  margin-bottom: 20px;
`;

const Button = styled.TouchableOpacity`
  margin-bottom: 15px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  color: #007bff;
`;

import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

interface ModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Modal: React.FC<ModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
}) => {
  return (
    <ModalContainer>
      <Overlay />
      <ModalContent>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ButtonContainer>
          {cancelText && (
            <Button onPress={onCancel}>
              <ButtonText>{cancelText}</ButtonText>
            </Button>
          )}
          {confirmText && (
            <Button onPress={onConfirm}>
              <ButtonText>{confirmText}</ButtonText>
            </Button>
          )}
        </ButtonContainer>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 327px;
  height: 154px;
  border-radius: 20px;
  border: 1px solid #fcc;
  background: #fff;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 1;
`;

const ModalTitle = styled.Text`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  padding-top: 20px;
`;

const ModalMessage = styled.Text`
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const Button = styled(TouchableOpacity)`
  width: 128px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #fee;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

const ButtonText = styled.Text`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
`;

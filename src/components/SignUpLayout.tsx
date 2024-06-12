// components/SignUpLayout.tsx
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TopLeftContainer = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  flex: 1;
  flex-direction: column; /* 올바른 속성명을 사용하세요 */
  align-items: center;
`;

const CenterContainer = styled.View`
  margin-top: 40px; /* 올바른 속성명을 사용하세요 */
  justify-content: center;
  align-items: center;
`;

const LayoutContainer = ({children}: {children: React.ReactNode}) => {
  return <Container>{children}</Container>;
};

LayoutContainer.TopLeft = TopLeftContainer;
LayoutContainer.Center = CenterContainer;

export default LayoutContainer;

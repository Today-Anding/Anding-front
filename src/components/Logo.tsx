import styled from 'styled-components/native';

const WhiteLogoText = styled.Text`
  color: #fff;
  font-family: 'COOPBL';
  font-size: 24px;
`;

const BlackLogoText = styled.Text`
  color: #000;
  font-family: 'COOPBL';
  font-size: 24px;
`;

export function BlackLogo() {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <BlackLogoText>Anding</BlackLogoText>;
}

export function WhiteLogo() {
  // eslint-disable-next-line react/react-in-jsx-scope
  return <WhiteLogoText>Anding</WhiteLogoText>;
}

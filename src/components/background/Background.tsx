import styled from 'styled-components/native';

export const PinkBackground = styled.View`
  width: 100%;
  height: 227px;
  border-radius: 0px 0px 50px 50px;
  background: #ff7d7d;
  align-items: center;
  justify-content: center;
`;

export const BigGlassBackground = styled.View`
  width: 352px;
  height: 600px;
  padding: 36px;
  background: rgba(255, 255, 255, 0.773);
  border-width: 2px;
  border-color: rgba(255, 60, 142, 0.3);
  border-radius: 30px;
  backdrop-filter: blur(15px);
  margin-top: -70px;
  align-self: center;
  z-index: 2;
`;

export const ReadGlassBackground = styled.View`
  width: 362px;
  height: 100%;
  padding: 36px;
  background: rgba(255, 255, 255, 0.773);
  border-width: 2px;
  border-color: rgba(255, 60, 142, 0.3);
  border-radius: 30px;
  backdrop-filter: blur(15px);
  margin-top: -70px;
  align-self: center;
  z-index: 2;
`;

export const ReadGlassTextBackground = styled.View`
  width: 322px;
  height: auto;
  flex-shrink: 0;
  padding: 36px;
  background: #fff;
  border-width: 2px;
  border-color: rgba(255, 60, 142, 0.3);
  border-radius: 13.5px;
  backdrop-filter: blur(15px);
  align-self: center;
  z-index: 2;
  margin-top: 10px;
`;

import styled from 'styled-components/native';

export const PinkBackground = styled.View`
  width: 100%;
  height: 304px;
  background: #ff7d7d;
  align-items: center;
  padding-top: 70px;
`;

export const BigGlassBackground = styled.View`
  width: 352px;
  height: 635px;
  padding: 36px;
  background: rgba(255, 255, 255, 0.773);
  border-width: 2px;
  border-color: rgba(255, 60, 142, 0.3);
  border-radius: 30px;
  backdrop-filter: blur(15px);
  margin-top: -180px;
  align-self: center;
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

export const WhiteMypageBackground = styled.View`
  flex: 1;
  position: absolute;
  top: 250px;
  width: 100%;
  height: 611px;
  background-color: #fff;
  border-radius: 30px 30px 0 0;
`;

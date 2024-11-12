import React, { useRef, useState, useCallback } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width: screenWidth } = Dimensions.get('window');
const REM_TO_PIXELS = 16;
const ITEM_WIDTH = 8.6875 * REM_TO_PIXELS;
const ITEM_HEIGHT = 8.6875 * REM_TO_PIXELS;
const SIDE_MARGIN = (screenWidth - ITEM_WIDTH) / 2;

interface CarouselItem {
  imageSource: any;
}

interface CarouselProps {
  items: CarouselItem[];
}

const MainCarousel: React.FC<CarouselProps> = ({ items }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = useCallback((event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / ITEM_WIDTH);
    setCurrentIndex(index);
  }, []);

  return (
    <CarouselContainer>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: SIDE_MARGIN - 10 }}
      >
        {items.map((item, index) => (
          <CarouselItemContainer
            key={index}
            style={{ marginRight: index === items.length - 1 ? 0 : 8 }}
          >
            <StyledImage source={item.imageSource} />
          </CarouselItemContainer>
        ))}
      </ScrollView>
    </CarouselContainer>
  );
};

export default MainCarousel;

const CarouselContainer = styled.View`
  width: 100%;
  position: relative;
  margin-top: 32px;
`;

const CarouselItemContainer = styled.View`
  width: ${ITEM_WIDTH}px;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.Image`
  width: 139px;
  height: 139px;
  border-radius: 15px;
  flex-shrink: 0;
`;

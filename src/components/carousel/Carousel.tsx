import React, { useRef, useState, useCallback } from 'react';
import { ScrollView, Image, Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const { width: screenWidth } = Dimensions.get('window');

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
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(index);
  }, []);

  // Scroll to the center image when currentIndex changes
  React.useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: currentIndex * screenWidth,
        animated: false, // Set to true if you want smooth scrolling
      });
    }
  }, [currentIndex]);

  return (
    <CarouselContainer>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {items.map((item, index) => (
          <CarouselItemContainer key={index}>
            <Image source={item.imageSource} style={styles.image} />
          </CarouselItemContainer>
        ))}
      </ScrollView>
      <Pagination>
        {items.map((_, index) => (
          <PaginationDot key={index} active={index === currentIndex} />
        ))}
      </Pagination>
    </CarouselContainer>
  );
};

export default MainCarousel;

const CarouselContainer = styled.View`
  width: ${screenWidth}px;
  position: relative;
  margin-top: 32px;
  margin: 32px;
`;

const CarouselItemContainer = styled.View`
  width: ${screenWidth}px;
  justify-content: center;
  align-items: center;
`;

const Pagination = styled.View`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: center;
`;

const PaginationDot = styled.View<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? '#ff7070' : '#ddd')};
  margin: 0 5px;
`;

const styles = StyleSheet.create({
  image: {
    width: 139,
    height: 139,
    resizeMode: 'cover',
  },
});

import React, { useState, useEffect } from 'react';
import { FlatList, Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { Black16px, Pink12pxBold } from '../text/Text';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import Config from 'react-native-config';

const { width: viewportWidth } = Dimensions.get('window');

function MyPageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 추가된 상태: API로부터 받아온 carousel 데이터 저장
  const [carouselItems, setCarouselItems] = useState<{ title: string }[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);

  // API 호출을 위한 useEffect
  useEffect(() => {
    const fetchCarouselItems = async () => {
      try {
        const apiUrl = Config.API_URL;
        const response = await axios.get(
          `${apiUrl}/api/v1/star/getTop4RecentStar`,
          {
            headers: {
              'X-AUTH-TOKEN': token,
              accept: '*/*',
            },
          },
        );

        const items = response.data.items.map((item: any) => ({
          title: item.title,
        }));
        setCarouselItems(items);
      } catch (error) {
        console.error('Error fetching carousel items:', error);
      }
    };

    fetchCarouselItems();
  }, []);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(contentOffsetX / viewportWidth);
    setCurrentIndex(newIndex);
  };

  const renderItem = ({ item }: { item: { title: string } }) => (
    <ReadingEndingBox>
      <Black16px>{item.title}</Black16px>
      <ReadingEndingBoxStroke />
      <Pink12pxBold>ANDING 다시보기</Pink12pxBold>
    </ReadingEndingBox>
  );

  return (
    <CarouselContainer>
      <FlatList
        data={carouselItems}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.title}
        onScroll={handleScroll}
        contentContainerStyle={styles.carouselContentContainer}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={viewportWidth * 0.8 + 16}
      />
    </CarouselContainer>
  );
}

const styles = StyleSheet.create({
  carouselContentContainer: {
    paddingHorizontal: 16,
  },
});

const CarouselContainer = styled.View`
  width: 100%;
  height: 167px;
  margin-top: 24px;
`;

const ReadingEndingBox = styled.View`
  width: ${viewportWidth * 0.3}px;
  height: 167px;
  border: 1px solid #ff7d7d;
  border-radius: 13px;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-right: 16px;
`;

const ReadingEndingBoxStroke = styled.View`
  width: 106px;
  height: 1px;
  background: #fcc;
`;

export default MyPageCarousel;

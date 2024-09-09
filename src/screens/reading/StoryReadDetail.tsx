import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import {
  PinkBackground,
  ReadGlassBackground,
  ReadGlassTextBackground,
} from '../../components/background/Background';
import { WhiteLogo } from '../../components/logo/Logo';
import { Black12px, Black16px } from '../../components/text/Text';
import ReviewComponent from '../../components/review/Review';

export type RootStackParamList = {
  StoryReadCategory: undefined;
  StoryReadDetail: { title: string };
};

type DetailPageRouteProp = RouteProp<RootStackParamList, 'StoryReadDetail'>;

function StoryReadDetail() {
  const route = useRoute<DetailPageRouteProp>();
  const { title } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <PinkBackground>
          <WhiteLogo />
        </PinkBackground>
        <ReadGlassBackground>
          <View style={styles.headerContainer}>
            <Black16px
              style={styles.titleText}
            >{`'${title}'의 앤딩입니다.`}</Black16px>
            <Black12px style={styles.authorText}>작가 유경빈</Black12px>
          </View>
          <ReadGlassTextBackground>
            <Text style={styles.content}>
              수진이 과거에 남은 지 몇 년이 흐르고, 과거는 예상치 못한 방향으로
              흘러가며 더 나은 미래를 만들어냅니다. 하지만 그동안 지훈은
              수진과의 기억을 떠올리며 그녀를 그리워합니다. 어느 날, 지훈이
              과거에 수진과 함께 했던 장소를 홀로 방문하던 중, 그곳에서 한
              소녀를 마주칩니다. 소녀는 지훈을 보고 수줍게 미소 지으며 말합니다.
              "아저씨, 혹시 이거 아세요?" 소녀가 내민 것은 수진이 남긴 일기장의
              한 페이지. 지훈은 깜짝 놀라며 그 페이지를 받아들고, 눈물이 맺힌
              채로 글을 읽어 내려갑니다. "지훈, 나와 당신의 이야기가 끝이 아니길
              바래요. 시간이 우리를 갈라놓았어도, 언젠가 다시 만날 수 있을
              거라고 믿어요." 그리고 그 순간, 지훈의 앞에 수진이 어른으로 다시
              나타납니다. 그들은 시간이 지나도 서로를 잊지 않았다는 것을
              확인하며 따뜻한 포옹을 나눕니다. 새롭게 변화된 현재에서 두 사람은
              다시 만나고, 그들은 함께 과거의 상처를 치유하며 앞으로의 삶을 함께
              하기로 결심합니다. 엔딩은 두 사람이 손을 잡고 환하게 웃으며 해변을
              걷는 장면으로 마무리됩니다. 파도가 그들의 발밑을 감싸고, 태양은
              그들 앞에 새로운 시작을 약속하듯이 밝게 빛나고 있습니다.
            </Text>
          </ReadGlassTextBackground>
          <ReviewComponent />
        </ReadGlassBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleText: {
    flex: 1,
    textAlign: 'left',
  },
  authorText: {
    textAlign: 'right',
    paddingTop: 30,
  },
  content: {
    fontSize: 12,
    marginBottom: 10,
  },
});

export default StoryReadDetail;

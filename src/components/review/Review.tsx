import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Black10px } from '../text/Text';
import { Image, TouchableOpacity } from 'react-native';

function ReviewComponent() {
  const [review, setReview] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState<
    { author: string; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleReviewSubmit = () => {
    if (review.trim()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const newReview = {
          author: `작성자${submittedReviews.length + 1}`, // Dummy author name
          text: review,
        };
        setSubmittedReviews([...submittedReviews, newReview]);
        setReview('');
        setLoading(false);
      }, 1000); // Simulate network delay
    }
  };

  return (
    <Container>
      <InputColumn>
        <UnderlineContainer>
          <TextContainer>
            <Black10px>리뷰 작성하기</Black10px>
            <Underline />
          </TextContainer>
        </UnderlineContainer>
        <ScrollViewContainer>
          <ReviewInput
            placeholder="리뷰를 작성해주세요"
            value={review}
            onChangeText={setReview}
            multiline
            textAlignVertical="top"
          />
          <SubmitButton onPress={handleReviewSubmit} disabled={loading}>
            <SubmitButtonImage
              source={require('../../assets/images/ReviewSubmitImg.png')}
            />
          </SubmitButton>
        </ScrollViewContainer>
      </InputColumn>
      <ReviewListContainer>
        <UnderlineContainer>
          <TextContainer>
            <Black10px>리뷰 확인하기</Black10px>
            <Underline />
          </TextContainer>
        </UnderlineContainer>
        {submittedReviews.map((reviewItem, index) => (
          <ReviewItem key={index}>
            <ReviewStroke />
            <ReviewText>{reviewItem.text}</ReviewText>
            <ReviewAuthor>작성자:{reviewItem.author}</ReviewAuthor>
          </ReviewItem>
        ))}
      </ReviewListContainer>
    </Container>
  );
}

const Container = styled.View`
  padding: 27px;
  background-color: white;
  flex-direction: column;
`;

const UnderlineContainer = styled.View`
  align-self: flex-start;
`;

const Underline = styled.View`
  background-color: rgba(255, 204, 204, 0.55);
  height: 8px;
  width: 100%;
  position: absolute;
  bottom: 3px;
  z-index: -1;
`;

const TextContainer = styled.View`
  position: relative;
  padding-bottom: 4px;
`;

const InputColumn = styled.View`
  flex-direction: column;
`;

const ScrollViewContainer = styled.View`
  width: 335px;
  height: 104px;
  border-radius: 10px;
  border: 1px solid #cfcfcf;
  background: #fff;
  overflow: hidden;
  margin-top: 11px;
`;

const ReviewInput = styled.TextInput`
  flex: 1;
  padding: 10px;
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
`;

const SubmitButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

const SubmitButtonImage = styled(Image)`
  width: 25px;
  height: 25px;
`;

const ReviewStroke = styled.View`
  width: 335.024px;
  height: 1px;
  background: #cfcfcf;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ReviewListContainer = styled.View`
  margin-top: 20px;
`;

const ReviewItem = styled.View`
  min-height: 92px;
`;

const ReviewAuthor = styled.Text`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 8px;
  font-style: normal;
  font-weight: 300;
  position: absolute;
  bottom: 7px;
  right: 7px;
`;

const ReviewText = styled.Text`
  color: #000;
  font-family: 'Noto Sans KR';
  font-size: 10px;
  font-style: normal;
  font-weight: 300;
`;

export default ReviewComponent;

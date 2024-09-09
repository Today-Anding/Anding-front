import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function ReviewComponent() {
  const [review, setReview] = useState('');
  const [submittedReview, setSubmittedReview] = useState<string | null>(null);

  const handleReviewSubmit = () => {
    setSubmittedReview(review);
    setReview('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Text style={styles.label}>User</Text>
        <TextInput
          style={styles.input}
          placeholder="리뷰를 작성해주세요"
          value={review}
          onChangeText={setReview}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleReviewSubmit}
        >
          <Text style={styles.submitButtonText}>등록</Text>
        </TouchableOpacity>
      </View>
      {submittedReview && (
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewLabel}>작성된 리뷰:</Text>
          <Text style={styles.review}>{submittedReview}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 322,
    backgroundColor: 'white',
    borderColor: 'pink',
    borderWidth: 2,
    borderRadius: 13.5,
    padding: 10,
    marginTop: 20,
    alignSelf: 'center',
    zIndex: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FF9D9D',
    borderRadius: 13.5,
    padding: 10,
    marginRight: 10,
  },
  submitButton: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FF9D9D',
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    width: 68,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 14,
    color: '#000',
  },
  reviewContainer: {
    marginTop: 20,
  },
  reviewLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  review: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default ReviewComponent;

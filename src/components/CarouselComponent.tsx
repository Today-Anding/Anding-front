import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const CarouselComponent = () => {
  const [showCarousel, setShowCarousel] = useState(false);
  const layoutType = 'tinder';
  const imageSearchTerms = ['Books', 'Code', 'Nature', 'dogs'];

  const toggleCarousel = () => {
    setShowCarousel(!showCarousel);
  };

  const renderItem = ({item}: {item: string}) => {
    return (
      <View style={styles.slide}>
        <Image
          style={styles.image}
          source={{uri: `https://source.unsplash.com/350x350/?${item}`}}
        />
        <Text style={styles.label}>{item}</Text>
      </View>
    );
  };

  const renderControls = () => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleCarousel} style={styles.openButton}>
          <Text style={styles.openButtonText}>Open Carousel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCarousel = () => {
    return (
      <View style={styles.carouselContainer}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity onPress={toggleCarousel} style={styles.button}>
            <Text style={styles.label}>x</Text>
          </TouchableOpacity>
        </View>
        <Carousel
          layout={layoutType}
          data={imageSearchTerms}
          renderItem={renderItem}
          sliderWidth={350}
          itemWidth={350}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {showCarousel ? renderCarousel() : renderControls()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 15,
    padding: 10,
  },
  openButton: {
    backgroundColor: '#007bff',
    borderRadius: 15,
    padding: 10,
  },
  openButtonText: {
    color: 'white',
    fontSize: 16,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CarouselComponent;

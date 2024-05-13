import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7;
const PROMINENT_SCALE = 1.1;
const DEPRESSED_SCALE = 0.9;

const Trending = () => {
  const { trendingMovies, loading } = useSelector((state) => state.movies);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % trendingMovies.length;
      flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
      setCurrentIndex(nextIndex);
    }, 3000); // Change the interval duration as needed (e.g., 3000ms = 3 seconds)

    return () => clearInterval(intervalId);
  }, [currentIndex, trendingMovies.length]);

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * ITEM_WIDTH,
      index * ITEM_WIDTH,
      (index + 1) * ITEM_WIDTH,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [DEPRESSED_SCALE, PROMINENT_SCALE, DEPRESSED_SCALE],
      extrapolate: "clamp",
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[styles.cardContainer, { transform: [{ scale }], opacity }]}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          style={styles.poster}
        />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Now Playing </Text>
      <FlatList
        ref={flatListRef}
        data={trendingMovies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: (width - ITEM_WIDTH * 3) / 2,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16} // Adjust for smoother animation
        extraData={currentIndex}
        initialNumToRender={3} // Only render 3 items initially
        windowSize={3} // Render 3 items in advance
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20,
    color: "white",
  },
  cardContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  poster: {
    width: ITEM_WIDTH * 0.8,
    height: ITEM_WIDTH * 1.2,
    borderRadius: 10,
  },
});

export default Trending;

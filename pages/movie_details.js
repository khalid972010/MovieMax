import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getNameOfGenre } from "../utils/genre_helper";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/slices/movies-slice";
import Movie from "../components/movie";

const imgPath = "https://image.tmdb.org/t/p/w500/";

const MovieDetails = ({ route }) => {
  const { similarMovies } = useSelector((state) => state.movies);
  const { title, overview, rate, image, date, genre, id, poster } =
    route.params;
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const heartScale = useRef(new Animated.Value(1)).current;

  const handleLike = () => {
    setIsLiked(!isLiked);
    animateHeart();
    dispatch(
      toggleFavorite({ title, overview, rate, image, date, genre, id, poster })
    );
  };

  const animateHeart = () => {
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imgPath + image }}
          style={styles.image}
          resizeMode="cover"
        />

        <TouchableOpacity onPress={handleLike} style={styles.loveIcon}>
          <Animated.View style={{ transform: [{ scale: heartScale }] }}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={50}
              color={isLiked ? "#FF0000" : "#FFF"}
            />
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.title}>
          {title}
          <Text style={styles.date}>
            {" \n"}. Released . {new Date(date).getFullYear()} .{" "}
            {getNameOfGenre(genre)} .{"   "}
            <View style={{ marginTop: -2, marginRight: 3 }}>
              <Ionicons name="star" size={20} color="#FFD700" />
            </View>
            {Math.floor(rate)}/10
          </Text>
        </Text>

        <LinearGradient
          colors={[
            "rgba(0, 0, 0, -0.5)",
            "rgba(0, 0, 0, 0)",
            "rgba(0, 0, 0, 0.2)",
            "rgba(0, 0, 0, 0.4)",
            "rgba(0, 0, 0, 0.6)",
            "rgba(0, 0, 0, 0.8)",
            "rgba(0, 0, 0, 1)",
            "rgba(0, 0, 0, 1.5)",
          ]}
          style={styles.gradient}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.overview}>{overview}</Text>
      </View>
      <Text style={styles.similar}>Similar Movies</Text>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={similarMovies}
        renderItem={({ item }) => (
          <Movie
            title={item.title}
            overview={item.overview}
            id={item.id}
            image={item.backdrop_path}
            poster={item.poster_path}
            rate={item.vote_average}
            date={item.release_date}
            genre={item.genre_ids[0]}
            key={item.id.toString()}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.movieList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "black",
  },
  movieList: { paddingHorizontal: 12, height: 260, marginVertical: 10 },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 450,
    borderRadius: 10,
  },
  title: {
    position: "absolute",
    width: 350,
    bottom: 20,
    left: 20,
    fontSize: 32,
    fontWeight: "bold",
    zIndex: 100,
    color: "#FFF",
  },
  date: {
    zIndex: 100,
    fontSize: 15,
    color: "grey",
    marginTop: 20,
  },
  loveIcon: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 100,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  content: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 20,
  },
  ratingContainer: {},
  ratingText: {
    fontSize: 20,
    marginLeft: 5,
    color: "white",
  },
  overview: {
    marginTop: -40,
    fontSize: 15,
    lineHeight: 24,
    color: "lightgrey",
  },
  similar: {
    fontSize: 22,
    color: "white",
    paddingHorizontal: 21,
    fontWeight: "bold",
  },
});

export default MovieDetails;

import React, { memo, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchSimilarMovies } from "../redux/slices/movies-slice";

const Movie = ({ title, image, overview, poster, rate, date, genre, id }) => {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();

  const handleSeeMore = () => {
    dispatch(fetchSimilarMovies(id));
    navigation.navigate("Movie Details", {
      title,
      overview,
      image,
      poster,
      rate,
      date,
      genre,
      id,
    });
  };

  const imgPath = `https://image.tmdb.org/t/p/w500${poster}`;

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={handleSeeMore}>
      <View style={[styles.container, { opacity: isPressed ? 0.5 : 1 }]}>
        <Image source={{ uri: imgPath }} style={styles.image} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 180,
    flex: 1,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#454B66",
    elevation: 5,
    marginLeft: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: 300,
  },
});

export default Movie;

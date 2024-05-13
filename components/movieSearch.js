import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MovieSearch = ({
  title,
  image,
  overview,
  poster,
  rate,
  date,
  genre,
  id,
}) => {
  return (
    <View>
      {/* <Text>{title}</Text> */}
      <Text>{poster}</Text>
      {/* <Text>{overview}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({});

export default MovieSearch;

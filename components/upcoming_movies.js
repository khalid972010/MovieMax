import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Movie from "./movie";

const renderMovieItem = ({ item }) => (
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
);

const UpcomingMovies = () => {
  const { filteredMovies } = useSelector((state) => state.movies);

  return (
    <>
      <View style={styles.upcomingTitleRow}>
        <Text style={styles.upcomingTitle}>Upcoming</Text>
        <Text style={styles.upcomingTitle}>See All</Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={filteredMovies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.movieList}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  movieList: {
    paddingHorizontal: 10,
  },
  upcomingTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  upcomingTitleRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 20,
    justifyContent: "space-between",
  },
});

export default UpcomingMovies;

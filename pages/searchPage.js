import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/search";
import { fetchMovies } from "../redux/slices/movies-slice";
import Movie from "../components/movie";

const SearchPage = ({ route }) => {
  const { filteredMovies, loading } = useSelector((state) => state.movies);

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

  return (
    <SafeAreaView style={styles.container}>
      <Search />
      <FlatList
        data={filteredMovies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141E1D",
    marginTop: 45,
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default SearchPage;

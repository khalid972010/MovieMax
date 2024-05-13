// Import necessary modules and components
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Movie from "../components/movie";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  fetchTopratedMovies,
  fetchTrendingMovies,
} from "../redux/slices/movies-slice";
import Search from "../components/search";
import Genre from "../components/genre";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import UpcomingMovies from "../components/upcoming_movies";
import Trending from "./trending";

// Define the Home component
const Home = () => {
  // Initialize necessary hooks and variables
  const navigataion = useNavigation();
  const dispatch = useDispatch();
  const { filteredMovies, loading } = useSelector((state) => state.movies);
  const { filteredTopratedMovies } = useSelector((state) => state.movies);

  // Fetch movies data on component mount
  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchTopratedMovies());
    dispatch(fetchTrendingMovies());
  }, []);

  // Render movie item
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

  // Return JSX
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.appTitle}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.logoText}>Movie</Text>
            <Text style={[styles.logoText, styles.logoTextMax]}>Max</Text>
          </View>
          <Ionicons
            onPress={() => {
              navigataion.navigate("Search", { filteredMovies });
            }}
            name="search"
            color={"white"}
            size={35}
            style={styles.searchIcon}
          />
        </View>
        {/* Conditional rendering based on loading state */}
        {loading ? (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : (
          <>
            <Trending />
            <UpcomingMovies />
            {/* Render top rated movies */}
            <View style={styles.upcomingTitleRow}>
              <Text style={styles.upcomingTitle}>Top Rated</Text>
              <Text style={styles.upcomingTitle}>See All</Text>
            </View>
            <FlatList
              horizontal={true}
              data={filteredTopratedMovies}
              renderItem={renderMovieItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.movieList}
            />
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

// Define styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141E1D",
  },
  appTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 30,
  },
  logoText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  logoTextMax: {
    color: "#FFD700",
  },
  searchIcon: {
    alignSelf: "flex-end",
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

// Export the Home component
export default Home;

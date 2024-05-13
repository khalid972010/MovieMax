import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchResults, searchMovies } from "../redux/slices/movies-slice";
import Genre from "./genre";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const handleChangeText = (text) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      dispatch(clearSearchResults());
    } else {
      dispatch(searchMovies(text));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons
          name="movie-search"
          size={26}
          color="#141E1D"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search movies..."
          value={searchQuery}
          onChangeText={handleChangeText}
        />
        <Genre />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 12,
    marginBottom: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
});

export default Search;

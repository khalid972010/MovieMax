import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../redux/slices/movies-slice";
import { Swipeable } from "react-native-gesture-handler";

const imgPath = `https://image.tmdb.org/t/p/w500`;

const Favorites = () => {
  const { favoriteMovies, loading } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const renderRightActions = (progress, dragX, item) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 0, 1],
    });
    return (
      <TouchableOpacity
        onPress={() => handleDelete(item)}
        style={styles.deleteButton}>
        <Animated.Text
          style={[
            styles.deleteButtonText,
            { transform: [{ translateX: trans }] },
          ]}>
          Remove from favorites
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  const handleDelete = (item) => {
    dispatch(toggleFavorite(item));
  };

  const renderMovieItem = ({ item }) => (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, item)
      }>
      <TouchableOpacity style={styles.card} activeOpacity={0.8}>
        <Image
          source={{ uri: imgPath + item.image }}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.overview} numberOfLines={3}>
            {item.overview}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return favoriteMovies.length > 0 ? (
    <View style={styles.container}>
      <Text style={styles.titleF}>Your Watch List</Text>
      <FlatList
        data={favoriteMovies}
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  ) : (
    <View style={styles.centeredContainer}>
      <Text style={styles.centeredText}>Favourite movies to watch later</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141E1D",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141E1D",
  },
  centeredText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  flatListContainer: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
    height: 150,
  },
  poster: {
    width: 120,
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  details: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 8,
  },
  titleF: {
    fontSize: 23,
    fontWeight: "bold",
    marginVertical: 20,
    color: "white",
  },
  overview: {
    fontSize: 14,
    color: "#666",
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 150,
  },
  deleteButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    width: 80,
    textAlign: "center",
    lineHeight: 20,
  },
});

export default Favorites;

import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import Home from "../pages/home";
import MovieDetails from "../pages/movie_details";
import SearchPage from "../pages/searchPage";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerBackImage: () => (
            <Ionicons name="chevron-back" size={52} color="white" />
          ),
          headerTitle: "",
          headerBackTitleVisible: false,
        }}>
        <Stack.Screen name="All Movies" component={Home} />
        <Stack.Screen name="Search" component={SearchPage} />
        <Stack.Screen name="Movie Details" component={MovieDetails} />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({});

export default HomeStack;

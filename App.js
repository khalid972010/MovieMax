import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./redux/store";
import BottomNav from "./navigators/bottom_nav";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function App() {
  return (
    <NavigationContainer
      theme={{ colors: { background: "#141E1D", text: "white" } }}>
      <StatusBar barStyle="light-content" />
      <GestureHandlerRootView>
        <Provider store={store}>
          <BottomNav />
        </Provider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
});

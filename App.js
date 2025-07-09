import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar"; // ✅ Add this
import HomeScreen from "./src/screens/HomeScreen";
import MovieDetailScreen from "./src/screens/MovieDetailScreen";
import SearchScreen from "./src/screens/SearchScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { WatchlistProvider } from "./src/context/WatchlistContext";
import WatchlistScreen from "./src/screens/WatchlistScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <WatchlistProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#FFE353" }}
          edges={["top", "left", "right"]}
        >
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Watchlist" component={WatchlistScreen} />
              <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
              <Stack.Screen name="Search" component={SearchScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </WatchlistProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa", 
  },
});

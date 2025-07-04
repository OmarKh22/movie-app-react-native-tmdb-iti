import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar'; // ✅ Add this
import HomeScreen from './src/screens/HomeScreen';
import MovieDetailScreen from './src/screens/MovieDetailScreen';
import SearchScreen from './src/screens/SearchScreen';
// import WishlistScreen from './src/screens/WishlistScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      {/* ✅ Hide the status bar */}
      <StatusBar hidden />

      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          {/* <Stack.Screen name="Wishlist" component={WishlistScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

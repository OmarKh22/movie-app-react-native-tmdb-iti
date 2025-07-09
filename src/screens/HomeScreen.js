import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import MovieCard from "../components/MovieCard";
import { fetchNowPlaying } from "../api/tmdb";
import Pagination from "../components/Pagination";

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleSearch = (query) => {
    if (!query.trim()) return;
    navigation.navigate("Search", { query: query.trim() });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchNowPlaying(pageNumber);
        setMovies(data.results);
        setTotalPageNumber(data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [pageNumber]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header onWishlistPress={() => navigation.navigate("Watchlist")} />

      <SearchBox onSearch={handleSearch} />

      <Text style={styles.heading}>Now Playing</Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#000"
          style={{ marginTop: 20 }}
        />
      ) : (
        <View style={styles.grid}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPress={() =>
                navigation.navigate("MovieDetail", { id: movie.id })
              }
            />
          ))}
        </View>
      )}
      <Pagination
        totalPageNumber={totalPageNumber}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
    columnGap: 8,
    paddingHorizontal: 16,
  },
});

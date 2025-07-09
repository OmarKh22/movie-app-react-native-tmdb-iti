import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useWatchlist } from "../context/WatchlistContext";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";

const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const cardWidth = (screenWidth - 16 * 2 - 8) / numColumns;

const WatchlistScreen = ({ navigation }) => {
  const { watchlist } = useWatchlist();

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <MovieCard
        movie={item}
        onPress={() => navigation.navigate("MovieDetail", { id: item.id })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Watchlist" onWishlistPress={() => {}} />

      {watchlist.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>My Watchlist</Text>
          <Text style={styles.emptyText}>No Movies in watch list</Text>
          <Text style={styles.emptyHint}>
            Click the heart icon on movies to add them to your watch list
          </Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.backButtonText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={watchlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
};

export default WatchlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  cardWrapper: {
    width: cardWidth,
  },
  emptyWrap: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 6,
  },
  emptyHint: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 20,
    maxWidth: 280,
  },
  backButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    fontWeight: "bold",
    color: "#111",
    fontSize: 16,
  },
});

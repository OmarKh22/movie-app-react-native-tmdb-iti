import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet, FlatList, Platform, StatusBar as RNStatusBar, TouchableOpacity, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Uncomment if using vector icons
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import { fetchMovieDetail, fetchRecommendations } from '../api/tmdb';
import VoteCircle from '../components/VoteCircle';

const ACCENT = '#ffe066';
const BG = '#fafafa';
const CARD = '#fff';
const TITLE = '#222';
const SUB = '#666';
const STAR = '★'; // Use emoji for star
const HEART = '❤'; // Use emoji for heart

const MovieDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      const data = await fetchMovieDetail(id);
      setMovie(data);
      setLoading(false);
    };
    const loadRecommendations = async () => {
      const data = await fetchRecommendations(id);
      setRecommendations(data.results || []);
    };
    loadMovie();
    loadRecommendations();
  }, [id]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 32 }} />;
  }

  if (!movie) {
    return <Text>Movie not found.</Text>;
  }

  // Helper to render stars for rating
  const renderStars = (rating) => {
    const stars = Math.round(rating / 2);
    return (
      <Text style={styles.stars}>
        {Array.from({ length: 5 }, (_, i) => (i < stars ? STAR : '☆')).join(' ')}
      </Text>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <StatusBar style="dark" backgroundColor={ACCENT} />
      {/* Colored status bar area */}
      <View style={{ height: Platform.OS === 'android' ? RNStatusBar.currentHeight : 44, backgroundColor: ACCENT }} />
      <Header 
        title="Movie App"
        favoriteCount={0} // TODO: connect to real favorite count
        onWishlistPress={() => { /* TODO: navigate to wishlist screen */ }}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.image}
        />
        <View style={styles.infoCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.title}>{movie.title}</Text>
            <TouchableOpacity onPress={() => setFavorite((f) => !f)}>
              <Text style={[styles.heart, favorite && { color: '#ff4d4d' }]}>{favorite ? '❤' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            {renderStars(movie.vote_average)}
            <Text style={styles.voteCount}>({movie.vote_count})</Text>
          </View>
          {/* Genres as colored pills */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
            {movie.genres && movie.genres.map((g) => (
              <View key={g.id} style={{ backgroundColor: '#ffe066', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 4, marginRight: 8, marginBottom: 6 }}>
                <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 13 }}>{g.name}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.overview}>{movie.overview}</Text>
          {/* Duration, Language, Studio, Website */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 8 }}>
            <Text style={styles.label}>Duration: <Text style={styles.labelValue}>{movie.runtime ? `${movie.runtime} Min.` : '-'}</Text></Text>
            <Text style={[styles.label, { marginLeft: 16 }]}>Languages: <Text style={styles.labelValue}>{movie.spoken_languages && movie.spoken_languages.length > 0 ? movie.spoken_languages[0].english_name : '-'}</Text></Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            {movie.production_companies && movie.production_companies[0] && movie.production_companies[0].logo_path && (
              <Image source={{ uri: `https://image.tmdb.org/t/p/w200${movie.production_companies[0].logo_path}` }} style={{ width: 60, height: 30, resizeMode: 'contain', marginRight: 8 }} />
            )}
            {movie.homepage ? (
              <TouchableOpacity onPress={() => movie.homepage && Linking.openURL(movie.homepage)} style={{ backgroundColor: '#fffbe6', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 4 }}>
                <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 13 }}>Website</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        {/* Recommendations Section */}
        <View style={styles.recommendSection}>
          <Text style={styles.recommendTitle}>Recommendations</Text>
          <FlatList
            data={recommendations}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                onPress={() => navigation.navigate('MovieDetail', { id: item.id })}
                favorite={false}
                onFavoritePress={() => {}}
              />
            )}
            ListEmptyComponent={<Text style={{ margin: 16 }}>No recommendations available</Text>}
            contentContainerStyle={{ paddingHorizontal: 8 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBarPad: {
    height: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
    backgroundColor: ACCENT,
  },
  headerBar: {
    backgroundColor: ACCENT,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: TITLE,
    letterSpacing: 1,
  },
  heart: {
    fontSize: 28,
    color: '#bbb',
    marginLeft: 8,
  },
  image: {
    width: '90%',
    height: 400,
    alignSelf: 'center',
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 16,
    backgroundColor: CARD,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoCard: {
    backgroundColor: CARD,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: TITLE,
    marginBottom: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  stars: {
    fontSize: 20,
    color: '#f5c518',
    marginRight: 8,
  },
  voteCount: {
    fontSize: 14,
    color: SUB,
    marginLeft: 4,
  },
  overview: {
    fontSize: 16,
    color: SUB,
    marginBottom: 14,
  },
  label: {
    fontSize: 15,
    color: SUB,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  labelValue: {
    fontWeight: 'normal',
    color: TITLE,
  },
  recommendSection: {
    marginTop: 24,
    paddingVertical: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: 120,
  },
  recommendTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 8,
    color: TITLE,
  },
});

export default MovieDetailScreen;
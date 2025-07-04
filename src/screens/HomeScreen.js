import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Platform, StatusBar as RNStatusBar } from 'react-native';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { fetchNowPlaying } from '../api/tmdb';

const ACCENT = '#ffe066';

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [recommendFavorites, setRecommendFavorites] = useState({});

  const loadMovies = async (pageNum) => {
    setLoading(true);
    const data = await fetchNowPlaying(pageNum);
    setMovies(data.results);
    setPage(data.page);
    setTotalPages(data.total_pages);
    setLoading(false);
  };

  useEffect(() => {
    loadMovies(page);
  }, [page]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
      {/* Colored status bar area */}
      <View style={{ height: Platform.OS === 'android' ? RNStatusBar.currentHeight : 44, backgroundColor: ACCENT }} />
      <Header 
        title="Movie App" 
        favoriteCount={Object.values(recommendFavorites).filter(Boolean).length}
        onWishlistPress={() => { /* TODO: navigate to wishlist screen */ }}
      />
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 32 }} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => navigation.navigate('MovieDetail', { id: item.id })}
              favorite={!!recommendFavorites[item.id]}
              onFavoritePress={() => {
                setRecommendFavorites(favs => ({
                  ...favs,
                  [item.id]: !favs[item.id]
                }));
              }}
            />
          )}
        />
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
      />
    </View>
  );
};

export default HomeScreen;
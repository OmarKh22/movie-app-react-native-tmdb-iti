import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import VoteCircle from './VoteCircle';

const MovieCard = ({ movie, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.posterWrap}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
          style={styles.image}
        />
        <View style={styles.dotsWrap}>
          <Text style={styles.dots}>⋯</Text>
        </View>
        <View style={styles.voteCircleWrap}>
          <VoteCircle vote={movie.vote_average} />
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
        <Text style={styles.date}>{movie.release_date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 280,
    marginHorizontal: 10,
    backgroundColor: 'transparent',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  posterWrap: {
    width: '100%',
    height: 170,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  voteCircleWrap: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    zIndex: 2,
  },
  dotsWrap: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  dots: {
    fontSize: 18,
    color: '#444',
    fontWeight: 'bold',
  },
  info: {
    width: '100%',
    height: 110,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    paddingTop: 14,
    paddingBottom: 12,
    marginTop: -8,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 2,
    textAlign: 'center',
    maxWidth: '90%',
  },
  date: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginTop: 2,
    maxWidth: '90%',
  },
});

export default MovieCard;
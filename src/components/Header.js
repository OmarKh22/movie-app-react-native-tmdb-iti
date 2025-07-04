import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Header = ({ title = 'Movie App', favoriteCount = 0, onWishlistPress, leftComponent }) => (
  <View style={styles.header}>
    {leftComponent ? leftComponent : <Text style={styles.title}>{title}</Text>}
    <TouchableOpacity style={styles.wishlist} onPress={onWishlistPress} activeOpacity={0.7}>
      <Text style={styles.heart}>❤</Text>
      {favoriteCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{favoriteCount}</Text>
        </View>
      )}
      <Text style={styles.wishlistText}>wishlist</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffe066',
    paddingTop: 0,
    paddingHorizontal: 18,
    paddingBottom: 12,
    minHeight: 56,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    letterSpacing: 0.5,
  },
  wishlist: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  heart: {
    fontSize: 28,
    color: '#fff',
    marginRight: 4,
    textShadowColor: '#ffb700',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: 18,
    backgroundColor: '#ffe066',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 2,
  },
  badgeText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 12,
    paddingHorizontal: 3,
  },
  wishlistText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 6,
    marginTop: 2,
  },
});

export default Header;
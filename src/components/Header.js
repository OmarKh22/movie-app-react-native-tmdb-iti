import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";

import { useWatchlist } from "../context/WatchlistContext";

const Header = ({ title = "MovieApp", onWishlistPress }) => {
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const { watchlist } = useWatchlist();
  const favoriteCount = watchlist.length;
  const toggleDropdown = () => {
    setShowLangDropdown((prev) => !prev);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.statusBar} />
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.rightSection}>
          {/* Language Dropdown */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              onPress={toggleDropdown}
              style={styles.langButton}
            >
              <Text style={styles.langText}>EN ▾</Text>
            </TouchableOpacity>
            {showLangDropdown && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>EN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem}>
                  <Text style={styles.dropdownText}>AR</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Wishlist */}
          <TouchableOpacity
            style={styles.wishlist}
            onPress={onWishlistPress}
            activeOpacity={0.8}
          >
            <View style={styles.heartWrapper}>
              <Text style={styles.heart}>🖤</Text>

              {favoriteCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{favoriteCount}</Text>
                </View>
              )}
            </View>

            <Text style={styles.wishlistText}>watchlist</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    backgroundColor: "#FFE353",
  },
  statusBar: {
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#FFE353",
  },

  container: {
    backgroundColor: "#FFE353",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  wishlist: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  heart: {
    fontSize: 22,
    color: "#000",
    marginRight: 4,
  },
  heartWrapper: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFE353",
    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 11,
  },
  wishlistText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
  },
  dropdownContainer: {
    position: "relative",
  },
  langButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  langText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#222",
  },
  dropdownMenu: {
    position: "absolute",
    top: 28,
    right: 0,
    backgroundColor: "white",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 10,
  },
  dropdownItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dropdownText: {
    fontSize: 14,
    color: "#111",
  },
});

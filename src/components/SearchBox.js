import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchBox = ({ onSearch, initialValue = '', minimal = false }) => {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
    <View style={styles.container}>
      {!minimal && (
        <>
          <Text style={styles.heading}>Welcome to our movie app</Text>
          <Text style={styles.subText}>
            Millions of movies, TV shows and people to discover. Explore now.
          </Text>
        </>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search and explore..."
          value={query}
          onChangeText={setQuery}
          style={styles.input}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#FFE353',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 14,
  },
});

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { searchMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import SearchBox from '../components/SearchBox';
import Header from '../components/Header';

const SearchScreen = ({ route, navigation }) => {
    const { query } = route.params;
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSearch = (newQuery) => {
        if (!newQuery.trim()) return;
        navigation.replace('Search', { query: newQuery.trim() });
    };

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const data = await searchMovies(query);
                setMovies(data.results);
            } catch (err) {
                console.error('Search error:', err.message);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [query]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Header />
            <SearchBox onSearch={handleSearch} initialValue={query} minimal />


            <Text style={styles.heading}>
                Search Results for:{' '}
                <Text style={styles.highlight}>
                    {query
                        .split(' ')
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ')}
                </Text>
            </Text>

            {loading ? (
                <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
            ) : movies.length > 0 ? (
                <View style={styles.grid}>
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onPress={() => navigation.navigate('MovieDetail', { id: movie.id })}
                        />
                    ))}
                </View>
            ) : (
                <Text style={styles.noResults}>No movies found.</Text>
            )}
        </ScrollView>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 40,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    highlight: {
        color: '#007AFF',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 12,
        columnGap: 8,
        paddingHorizontal: 16,
    },
    noResults: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginTop: 40,
    },
});

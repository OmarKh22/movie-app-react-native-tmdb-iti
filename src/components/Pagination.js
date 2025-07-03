import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Pagination = ({ page, totalPages, onPrev, onNext }) => (
  <View style={styles.container}>
    <Button title="Prev" onPress={onPrev} disabled={page <= 1} />
    <Button title="Next" onPress={onNext} disabled={page >= totalPages} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
});

export default Pagination;
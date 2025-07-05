import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function Pagination({ totalPageNumber, pageNumber, setPageNumber }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPageNumber <= maxVisible) {
      for (let i = 1; i <= totalPageNumber; i++) pages.push(i);
    } else {
      if (pageNumber <= 3) {
        pages.push(1, 2, 3, 4, 5, '...');
      } else if (pageNumber >= totalPageNumber - 2) {
        pages.push('...', totalPageNumber - 4, totalPageNumber - 3, totalPageNumber - 2, totalPageNumber - 1, totalPageNumber);
      } else {
        pages.push('...', pageNumber - 1, pageNumber, pageNumber + 1, '...');
      }
    }

    return pages;
  };

  const handleClick = (p) => {
    if (p !== '...' && p !== pageNumber) {
      setPageNumber(p);
    }
  };

  const handlePrev = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNext = () => {
    if (pageNumber < totalPageNumber) setPageNumber(pageNumber + 1);
  };

  return (
    <View style={styles.container}>
      {/* Prev Button */}
      <TouchableOpacity onPress={handlePrev} disabled={pageNumber === 1} style={styles.arrow}>
        <Text style={[styles.arrowText, pageNumber === 1 && styles.disabledText]}>{'<'}</Text>
      </TouchableOpacity>

      {/* Page Numbers */}
      <ScrollView horizontal contentContainerStyle={styles.pageNumbers} showsHorizontalScrollIndicator={false}>
        {getPageNumbers().map((p, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => handleClick(p)}
            disabled={p === '...'}
            style={[
              styles.pageButton,
              p === pageNumber && styles.activePage,
              p === '...' && styles.ellipsisButton
            ]}
          >
            <Text
              style={[
                styles.pageText,
                p === pageNumber && styles.activeText,
                p === '...' && styles.ellipsisText
              ]}
            >
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity onPress={handleNext} disabled={pageNumber === totalPageNumber} style={styles.arrow}>
        <Text style={[styles.arrowText, pageNumber === totalPageNumber && styles.disabledText]}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    marginHorizontal: "auto",
    width:"80%"
  },
  arrow: {
    padding: 8,
  },
  arrowText: {
    fontSize: 20,
    color: '#facc15',
  },
  disabledText: {
    color: '#d1d5db', 
  },
  pageNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  pageButton: {
    width: 36,
    height: 36,
    marginHorizontal: 4,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  pageText: {
    color: '#374151',
    fontSize: 14,
  },
  activePage: {
    backgroundColor: '#facc15',
    elevation: 3,
  },
  activeText: {
    color: '#000',
    fontWeight: 'bold',
  },
  ellipsisButton: {
    backgroundColor: 'transparent',
  },
  ellipsisText: {
    color: '#9ca3af',
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VoteCircle = ({ vote }) => {
  // Convert vote to percentage (0-100)
  const percent = Math.round((vote || 0) * 10);
  return (
    <View style={styles.circleShadow}>
      <View style={styles.circle}>
        <Text style={styles.value}>{percent}</Text>
        <Text style={styles.percent}>%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circleShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 3,
    elevation: 2,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 2.5,
    borderColor: '#1ec773',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  value: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 13,
  },
  percent: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 9,
    marginLeft: 1,
    marginTop: 2,
  },
});

export default VoteCircle;
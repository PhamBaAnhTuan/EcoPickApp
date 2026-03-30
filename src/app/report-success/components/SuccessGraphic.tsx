import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SuccessGraphic() {
  return (
    <View style={styles.graphicContainer}>
      <View style={styles.circleGraphic}>
        <Ionicons name="leaf" size={48} color="#FFFFFF" />
      </View>
      <View style={styles.smallBadge}>
        <Ionicons name="flower" size={12} color="#FFFFFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  graphicContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  circleGraphic: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2E8057',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3CB080',
  },
});

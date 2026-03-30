
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing } from '../../../../constants';

export function LocationHero() {
  return (
    <View style={s.heroContainer}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=800',
        }}
        style={s.heroImage}
        resizeMode="cover"
      />
      <View style={s.imageOverlay}>
        <Ionicons name="location-outline" size={16} color={Colors.white} />
        <Text style={s.imageOverlayText}>Riverside Recreation Trail</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  heroContainer: {
    margin: Spacing.base,
    borderRadius: 16,
    overflow: 'hidden',
    height: 320,
    backgroundColor: '#E2E8F0',
    position: 'relative',
  },
  heroImage: { width: '100%', height: '100%' },
  imageOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  imageOverlayText: {
    fontFamily: Fonts.medium,
    color: Colors.white,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});

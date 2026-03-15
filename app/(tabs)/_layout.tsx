import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Fonts, FontSizes } from '../../constants';

export default function TabLayout() {
  const router = useRouter();

  const handleReportPress = async (e: any) => {
    e.preventDefault(); // Prevent default navigation to the report tab

    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Camera permission is needed to report an issue. Please enable it in your device settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Go without photo', onPress: () => router.push('/report') }
        ]
      );
      return;
    }

    // Launch Camera
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        // Navigate to report tab and pass the image URI
        router.push({
          pathname: '/report',
          params: { imageUri }
        });
      }
    } catch (error) {
      console.error('Error opening camera:', error);
      Alert.alert('Error', 'Could not open the camera');
    }
  };
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textInactive,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="map"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'compass' : 'compass-outline'} size={24} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabBarLabel, { color }]}>Explore</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={24} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabBarLabel, { color }]}>Events</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report',
          tabBarIcon: ({ focused }) => (
            <View style={styles.floatingReportBtn}>
              <Ionicons name="camera-outline" size={30} color={Colors.white} />
            </View>
          ),
          tabBarLabel: ({ color }) => (
            <Text style={[styles.tabBarLabel, { color, marginTop: 12 }]}>Report</Text>
          ),
        }}
        listeners={{
          tabPress: handleReportPress,
        }}
      />
      <Tabs.Screen
        name="badges"
        options={{
          title: 'Badges',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'trophy' : 'trophy-outline'} size={24} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabBarLabel, { color }]}>Badges</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={[styles.tabBarLabel, { color }]}>Profile</Text>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.overlayWhiteStrong,
    borderTopColor: Colors.borderMedium,
    borderTopWidth: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 85 : 70,
    paddingTop: 13,
    paddingBottom: Platform.OS === 'ios' ? 32 : 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 30,
  },
  tabBarLabel: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.xs,
    textTransform: 'capitalize',
    marginTop: -4,
  },
  floatingReportBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
});

import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      {/* verify (OTP) – ẩn tạm, không cần nữa */}
      {/* <Stack.Screen name="verify" /> */}
      <Stack.Screen name="complete-profile" />
    </Stack>
  );
}

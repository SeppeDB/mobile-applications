import { Redirect, Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '../../src/state/useAuthStore';

export default function AppLayout() {
  const { isAuthenticated, isInitialized } = useAuthStore();

  if (!isInitialized) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  if (!isAuthenticated) return <Redirect href="/login" />;

  return <Stack />;
}
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { useAuthStore } from '../src/state/useAuthStore';
import { InputField } from '../src/components/primitives/InputField';
import { StyledButton } from '../src/components/StyledButton';
import { Stack } from '../src/components/primitives/Stack';
import { Text } from '../src/components/primitives/Text';

type Mode = 'login' | 'signup';

export default function LoginScreen() {
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const { login, signUp, isLoading, isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Redirect href="/" />;

  const handleSubmit = async () => {
    setError('');
    setInfo('');
    if (email.trim() === '' || password === '' || (mode === 'signup' && name.trim() === '')) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      if (mode === 'login') {
        await login(email.trim(), password);
        router.replace('/');
      } else {
        const loggedIn = await signUp(name.trim(), email.trim(), password);
        if (loggedIn) router.replace('/');
        else setInfo('Check your email to confirm your account, then log in.');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
    setInfo('');
  };

  return (
    <View style={styles.container}>
      <Stack gap="lg" padding="lg">
        <Text size="xl" weight="bold" align="center">
          {mode === 'login' ? 'Welcome back' : 'Create an account'}
        </Text>
        {mode === 'signup' && (
          <InputField label="Name" value={name} onChangeText={setName} testID="name-input" />
        )}
        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          testID="email-input"
        />
        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          testID="password-input"
          error={error !== '' ? error : undefined}
        />
        {info !== '' && <Text align="center">{info}</Text>}
        <StyledButton
          label={mode === 'login' ? 'Log in' : 'Sign up'}
          onPress={handleSubmit}
          isLoading={isLoading}
          testID="login-button"
        />
        <Pressable onPress={toggleMode} testID="toggle-mode">
          <Text align="center" size="sm">
            {mode === 'login' ? "No account yet? Sign up" : 'Already have an account? Log in'}
          </Text>
        </Pressable>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
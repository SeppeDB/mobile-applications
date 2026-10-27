import { useState } from 'react';
import { Pressable, Text as RNText, StyleSheet, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { useAuthStore } from '../src/state/useAuthStore';
import { Card } from '../src/components/primitives/Card';
import { InputField } from '../src/components/primitives/InputField';
import { StyledButton } from '../src/components/StyledButton';
import { Stack } from '../src/components/primitives/Stack';
import { Text } from '../src/components/primitives/Text';
import { colors, spacing } from '../src/theme';

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
      <View style={styles.content}>
        <Stack gap="sm" align="center">
          <RNText style={styles.logo}>🍿</RNText>
          <Text size="xl" weight="bold" align="center">Movie Night</Text>
          <Text align="center" color={colors.textMuted}>Pick tonight's movie together</Text>
        </Stack>

        <Card>
          <Stack gap="md" padding="lg">
            <Text size="lg" weight="bold">
              {mode === 'login' ? 'Welcome back' : 'Join the movie night'}
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
            {info !== '' && <Text color={colors.success}>{info}</Text>}
            <StyledButton
              label={mode === 'login' ? 'Log in' : 'Sign up'}
              onPress={handleSubmit}
              isLoading={isLoading}
              testID="login-button"
            />
          </Stack>
        </Card>

        <Pressable onPress={toggleMode} testID="toggle-mode">
          <Text align="center" color={colors.textMuted}>
            {mode === 'login' ? 'No account yet? ' : 'Already have an account? '}
            <Text weight="medium" color={colors.primary}>
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  content: { width: '100%', maxWidth: 400, gap: spacing.lg },
  logo: { fontSize: 56, lineHeight: 64, textAlign: 'center' },
});

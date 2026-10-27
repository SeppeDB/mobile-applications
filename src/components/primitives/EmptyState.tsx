import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors, spacing } from '../../theme';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <View style={styles.base}>
      <Text size="lg" weight="bold" align="center">{title}</Text>
      {description !== undefined && <Text align="center" color={colors.textMuted}>{description}</Text>}
      {action !== undefined && <View style={styles.action}>{action}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', gap: spacing.sm, padding: spacing.lg },
  action: { marginTop: spacing.sm },
});

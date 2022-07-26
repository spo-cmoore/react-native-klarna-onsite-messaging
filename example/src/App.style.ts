import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  box: {
    width: '100%',
    height: Platform.OS === 'android' ? 85 : undefined,
  },
});

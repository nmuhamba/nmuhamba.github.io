import { View, Text, StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.code}>404</Text>
      <Text style={styles.message}>Page Not Found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  code: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#1C1B1F',
  },
  message: {
    fontSize: 18,
    color: '#555',
    marginTop: 8,
  },
});

import { StyleSheet, Text, View } from 'react-native';

const Asset = () => {
  return (
    <View style={styles.container}>
      <Text>Asset component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Asset;

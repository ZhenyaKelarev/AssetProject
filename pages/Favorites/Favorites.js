import { StyleSheet, Text, View, Button } from 'react-native';

const Favorites = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Favorite page</Text>
      <Button
        title='Go to Home page'
        onPress={() => navigation.navigate('Home')}
      />
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

export default Favorites;

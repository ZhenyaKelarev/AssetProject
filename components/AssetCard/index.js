import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const AssetCard = ({ name, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Asset')}
    >
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
  },
});

export default AssetCard;
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { memo } from 'react';

const AssetCard = ({ name, navigation, price, id, slug }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Asset', {
          name,
          price,
          id,
          slug,
        })
      }
    >
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.text}>{`${price.toFixed(2)}$`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: '#205375',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginVertical: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5,

    elevation: 9,
  },
  text: {
    color: '#fff',
    marginVertical: 5,
  },
});

export default memo(AssetCard);

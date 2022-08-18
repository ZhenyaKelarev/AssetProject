import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FavoriteContext } from '../../context';

const Asset = ({ route }) => {
  const { favoritesData, setFavoritesData } = useContext(FavoriteContext);
  const name = route.params.name;
  const price = route.params.price;
  const id = route.params.id;

  const isFavorite = favoritesData.findIndex((element) => element.id === id);

  const toggleFavoriteItem = () => {
    if (isFavorite === -1) {
      setFavoritesData([...favoritesData, { name, price, id }]);
    } else {
      const newArr = favoritesData.filter((item) => {
        return item.id !== id;
      });
      setFavoritesData(newArr);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{price}</Text>
      <TouchableOpacity onPress={toggleFavoriteItem}>
        {isFavorite === -1 ? (
          <Ionicons name='bookmark-outline' size='40px' color='red' filled />
        ) : (
          <Ionicons name='bookmark' size='40px' color='red' filled />
        )}
      </TouchableOpacity>
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

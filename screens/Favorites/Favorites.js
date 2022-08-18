import { useContext } from 'react';
import AssetCard from '../../components/AssetCard';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { FavoriteContext } from '../../context';

const Favorites = ({ navigation }) => {
  const { favoritesData } = useContext(FavoriteContext);
  console.log('contextData', favoritesData);
  return (
    <View style={styles.container}>
      <FlatList
        data={favoritesData}
        renderItem={(itemData) => {
          return (
            <AssetCard
              navigation={navigation}
              name={itemData.item.name}
              price={itemData.item.price}
              id={itemData.item.id}
            />
          );
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
        alwaysBounceVertical={false}
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

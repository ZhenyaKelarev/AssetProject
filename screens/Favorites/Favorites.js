import { useContext } from 'react';
import AssetCard from '../../components/AssetCard';
import { StyleSheet, View, FlatList } from 'react-native';
import { FavoriteContext } from '../../context';

const Favorites = ({ navigation }) => {
  const { favoritesData } = useContext(FavoriteContext);
  return (
    <View style={styles.container}>
      <View style={styles.assetsContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1A17',
    alignItems: 'center',
    justifyContent: 'center',
  },
  assetsContainer: {
    flex: 2,
    width: '70%',
  },
});

export default Favorites;

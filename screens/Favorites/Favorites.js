import { useContext, memo } from 'react';
import AssetCard from '../../components/AssetCard';
import { StyleSheet, View, FlatList, ImageBackground } from 'react-native';
import { FavoriteContext } from '../../context';
import { LinearGradient } from 'expo-linear-gradient';

const Favorites = ({ navigation }) => {
  const { favoritesData } = useContext(FavoriteContext);
  console.log('favoritesData', favoritesData);
  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      style={styles.container}
    >
      <ImageBackground
        source={require('../../assets/images/background.jpg')}
        resizeMode='cover'
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.assetsContainer}>
          <FlatList
            style={styles.flatList}
            data={favoritesData}
            renderItem={(itemData) => (
              <AssetCard
                navigation={navigation}
                name={itemData.item.name}
                price={itemData.item.price}
                id={itemData.item.id}
                slug={itemData.item.slug}
              />
            )}
            keyExtractor={(item) => item.id}
            alwaysBounceVertical={false}
          />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootScreen: {
    flex: 1,
    width: '100%',
  },
  flatList: {
    width: '60%',
  },
  assetsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    opacity: 0.35,
  },
});

export default memo(Favorites);

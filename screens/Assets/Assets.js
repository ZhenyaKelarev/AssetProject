import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ImageBackground } from 'react-native';
import AssetCard from '../../components/AssetCard';
import Loader from '../../components/Loader';
import { LinearGradient } from 'expo-linear-gradient';

const Assets = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);

  const getAssets = async () => {
    const apiURL = `https://data.messari.io/api/v2/assets?limit=20&page=${pageCurrent}&fields=id,slug,name,metrics/market_data/price_usd`;
    try {
      const result = await fetch(apiURL);
      const response = await result.json();
      setData(data.concat(response.data));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    setPageCurrent(pageCurrent + 1);
    setIsLoading(true);
  };

  useEffect(() => {
    setIsLoading(true);
    getAssets();
  }, [pageCurrent]);

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
            showsVerticalScrollIndicator={false}
            style={styles.flatList}
            data={data}
            renderItem={(itemData) => (
              <AssetCard
                navigation={navigation}
                id={itemData.item.id}
                name={itemData.item.name}
                slug={itemData.item.slug}
                price={itemData.item.metrics.market_data.price_usd}
              />
            )}
            keyExtractor={(item) => item.id}
            alwaysBounceVertical={false}
            ListFooterComponent={<Loader isLoading={isLoading} />}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0}
          />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1A17',
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
    alignItems: 'center',
  },
  backgroundImage: {
    opacity: 0.35,
  },
});

export default Assets;

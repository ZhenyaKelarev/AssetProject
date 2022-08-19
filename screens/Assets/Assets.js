import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AssetCard from '../../components/AssetCard';
import Loader from '../../components/Loader';

const Assets = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageCurrent, setPageCurrent] = useState(1);

  const getAssets = async () => {
    const apiURL = `https://data.messari.io/api/v2/assets?limit=20&page=${pageCurrent}&fields=id,name,metrics/market_data/price_usd`;
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
    <View style={styles.container}>
      <View style={styles.assetsContainer}>
        <FlatList
          data={data}
          renderItem={(itemData) => {
            return (
              <AssetCard
                navigation={navigation}
                id={itemData.item.id}
                name={itemData.item.name}
                price={itemData.item.metrics.market_data.price_usd}
              />
            );
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
          ListFooterComponent={<Loader isLoading={isLoading} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  assetsContainer: {
    flex: 2,
    width: '70%',
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default Assets;

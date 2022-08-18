import { useState, useEffect } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import AssetCard from '../../components/AssetCard';

const Assets = ({ navigation }) => {
  const [data, setData] = useState([]);
  console.log('data', data);
  const getAssets = async () => {
    try {
      const result = await fetch(
        'https://data.messari.io/api/v2/assets?fields=id,name,metrics/market_data/price_usd'
      );
      const response = await result.json();
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAssets();
  }, []);

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
});

export default Assets;

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FavoriteContext } from '../../context';
import formatDate from '../../helpers/formatDate';
import Chart from '../../components/Chart';
import { throttle } from 'throttle-debounce';

const Asset = ({ route }) => {
  const [date, setDate] = useState(new Date());
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [prevDate, setPrevDate] = useState(
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)
  );
  const [data, setData] = useState([]);
  const { favoritesData, setFavoritesData } = useContext(FavoriteContext);
  const { name, price, id, slug } = route.params ?? {};

  const getAssetData = async () => {
    const apiURL = `https://data.messari.io/api/v1/assets/${slug}/metrics/price/time-series?start=${prevDate}&end=${date}&interval=1d`;
    try {
      const result = await fetch(apiURL);
      const response = await result.json();
      const newArr = response.data?.values.map((element) => {
        const formatedDate = +formatDate(element[0]);
        const formatedY = +element[1];
        return { x: formatedDate, y: formatedY };
      });
      setData(newArr);
      setIsLoadingChart(false);
    } catch (error) {
      console.error(error);
    }
  };

  const isFavorite = useMemo(() =>
    favoritesData.findIndex((element) => element.id === id)
  );

  const toggleFavoriteItem = useCallback(() => {
    if (isFavorite === -1) {
      setFavoritesData([...favoritesData, { name, price, id, slug }]);
    } else {
      const newArr = favoritesData.filter((item) => {
        return item.id !== id;
      });
      setFavoritesData(newArr);
    }
  });

  const throttleFunc = throttle(1000, () => toggleFavoriteItem(), {
    noLeading: false,
    noTrailing: true,
  });

  useEffect(() => {
    setIsLoadingChart(true);
    setDate(formatDate(date));
    setPrevDate(formatDate(prevDate));
    getAssetData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerAsset}>
        <Text numberOfLines={1} style={styles.text}>
          {name}
        </Text>
        <Text numberOfLines={1} style={styles.text}>{`${price.toFixed(
          2
        )}$`}</Text>
        <TouchableOpacity onPress={throttleFunc}>
          {isFavorite === -1 ? (
            <Ionicons name='bookmark-outline' size='40px' color='red' filled />
          ) : (
            <Ionicons name='bookmark' size='40px' color='red' filled />
          )}
        </TouchableOpacity>
      </View>

      <Chart isLoading={isLoadingChart} data={data} />
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
  headerAsset: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#14213d',
  },
  text: {
    color: '#fff',
    flex: 2,
  },
  containerVictory: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});

export default Asset;

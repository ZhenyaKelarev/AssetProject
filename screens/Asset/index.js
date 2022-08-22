import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FavoriteContext } from '../../context';
import formatDate from '../../helpers/formatDate';
import Chart from '../../components/Chart';

const Asset = ({ route }) => {
  const [date, setDate] = useState(new Date());
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [prevDate, setPrevDate] = useState(
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)
  );
  const [data, setData] = useState([]);
  const { favoritesData, setFavoritesData } = useContext(FavoriteContext);
  const name = route.params.name;
  const price = route.params.price;
  const id = route.params.id;
  const slug = route.params.id;

  useEffect(() => {
    setIsLoadingChart(true);
    setDate(formatDate(date));
    setPrevDate(formatDate(prevDate));
    getAssetData();
  }, []);

  const getAssetData = async () => {
    const apiURL = `https://data.messari.io/api/v1/assets/${slug}/metrics/price/time-series?start=${prevDate}&end=${date}&interval=1d`;
    try {
      const result = await fetch(apiURL);
      const response = await result.json();
      const newArr = response.data?.values.map((element) => {
        const formatedDate = formatDate(element[0]);
        const formatedY = +element[1].toFixed(2);
        return { x: formatedDate, y: formatedY };
      });
      setData(newArr);
      setIsLoadingChart(false);
    } catch (error) {
      console.error(error);
    }
  };

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
      <View style={styles.headerAsset}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{`${price.toFixed(2)}$`}</Text>
        <TouchableOpacity onPress={toggleFavoriteItem}>
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
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#14213d',
  },
  text: {
    color: '#fff',
  },
  containerVictory: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});

export default Asset;

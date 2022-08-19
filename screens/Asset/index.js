import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FavoriteContext } from '../../context';
import formatDate from '../../helpers/formatDate';
// import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

const Asset = ({ route }) => {
  const [date, setDate] = useState(new Date());
  const [prevDate, setPrevDate] = useState(
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)
  );
  const { favoritesData, setFavoritesData } = useContext(FavoriteContext);
  const name = route.params.name;
  const price = route.params.price;
  const id = route.params.id;
  const slug = route.params.id;

  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];

  useEffect(() => {
    setDate(formatDate(date));
    setPrevDate(formatDate(prevDate));
    getAssetData();
  }, []);

  console.log('date', date);
  console.log('prevDate', prevDate);

  const getAssetData = async () => {
    const apiURL = `https://data.messari.io/api/v1/assets/${slug}/metrics/price/time-series?start=${prevDate}&end=${date}&interval=1d`;
    try {
      const result = await fetch(apiURL);
      const response = await result.json();
      console.log('response', response);
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
      <Text>{name}</Text>
      <Text>{price}</Text>
      <TouchableOpacity onPress={toggleFavoriteItem}>
        {isFavorite === -1 ? (
          <Ionicons name='bookmark-outline' size='40px' color='red' filled />
        ) : (
          <Ionicons name='bookmark' size='40px' color='red' filled />
        )}
      </TouchableOpacity>
      {/* <View style={styles.containerVictory}>
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={data} x='quarter' y='earnings' />
        </VictoryChart>
      </View> */}
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
  containerVictory: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});

export default Asset;

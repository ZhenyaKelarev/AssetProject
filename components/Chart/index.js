import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryArea, VictoryChart } from 'victory-native';
import {
  scaleDiscontinuous,
  discontinuityRange,
} from '@d3fc/d3fc-discontinuous-scale';
import { scaleLinear } from 'd3-scale';
import Loader from '../Loader';

const Chart = ({ data, isLoading }) => {
  const [minValueY, setMinValueY] = useState();
  const discontinuousScale = scaleDiscontinuous(scaleLinear())
    .discontinuityProvider(discontinuityRange([50, 75]))
    .domain([0, 100])
    .range([0, 550]);
  const findSmallestY = (data) => {
    if (!data) return;
    const arrOfY = data?.map((element) => element.y);
    const min = Math.min(...arrOfY);
    return min;
  };

  useEffect(() => {
    setMinValueY(findSmallestY(data));
  }, [data]);

  return (
    <View style={styles.containerVictory}>
      <Loader />
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <VictoryChart
          minDomain={{ y: (Math.round(minValueY) / 100) * 99 }}
          width={400}
          height={400}
        >
          <VictoryArea
            style={{
              data: { fill: '#c43a31' },
            }}
            data={data}
          />
        </VictoryChart>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerVictory: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chart;

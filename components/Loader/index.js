import { View, ActivityIndicator, StyleSheet } from 'react-native';

const renderFooter = ({ isLoading }) => {
  return isLoading ? (
    <View style={styles.loader}>
      <ActivityIndicator size='large' />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default renderFooter;

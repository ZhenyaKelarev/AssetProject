import Asset from '../pages/Asset/index';
import Assets from '../pages/Assets/Assets';
import Favorites from '../pages/Favorites/Favorites';
import Ionicons from '@expo/vector-icons/Ionicons';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const TabComponent = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'ios-list' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name='Home' component={Assets} />
      <Tab.Screen name='Favorites' component={Favorites} />
    </Tab.Navigator>
  );
};

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Tab'
        screenOptions={({ route }) => ({
          headerShown: route.name === 'Asset',
        })}
      >
        <Stack.Screen name='Tab' component={TabComponent} />
        <Stack.Screen name='Asset' component={Asset} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from './screens/Home';
import Details from './screens/Details';
import type { PropsWithChildren } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MobileBills from './screens/priceScreens/MobileBills';

//type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;


export type RootStackParamList = {
  Home: undefined;
 Details:{productId:string},
 MobilePricePrediction:undefined
};
const Stack = createStackNavigator<RootStackParamList>();
function App(): React.JSX.Element {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Trending Products',
            headerShown: false, // Set headerShown to false to hide the header
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
        />
        <Stack.Screen
        name="MobilePricePrediction"
        component={MobileBills}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./src/redux/store";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import HeroInfoScreen from "./src/screens/HeroInfoScreen.tsx";


const Stack = createStackNavigator();

export default function App() {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerStyle: { backgroundColor: '#000000', height: 180 },
                    }}>

                        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
                        {/*<Stack.Screen name="ProductivityCheck" component={ProductivityCheck} options={{ headerShown: false }} />*/}

                        <Stack.Screen
                            name="HeroInfoScreen"
                            component={HeroInfoScreen}
                            options={{ headerShown: false }}
                        />

                    </Stack.Navigator>
                </NavigationContainer>
          </PersistGate>
         </Provider>
    );
}

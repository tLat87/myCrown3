import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Image, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./src/redux/store";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import ProductivityCheck from "./src/screens/ProductivityCheck";
import BackgroundMusic from "./src/component/BackgroundMusic";
import HeroInfoScreen from "./src/screens/HeroInfoScreen.tsx";


const Stack = createStackNavigator();

const leftCu = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => {navigation.goBack()}} style={{marginLeft: 16}}>
            {/*<BackArrow/>*/}
        </TouchableOpacity>
        )
    }

export default function App() {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BackgroundMusic />
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{
                        headerStyle: { backgroundColor: '#000000', height: 180 },
                        // headerLeft: leftCu,

                        headerShadowVisible: false,
                    }}>

                        {/*<Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />*/}
                        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />
                        <Stack.Screen name="ProductivityCheck" component={ProductivityCheck} options={{ headerShown: false }} />

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

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import HomeScreen from '../screens/HomeScreen';

import {useNavigation} from '@react-navigation/native';
import HabitTracker from '../screens/HabitTracker';
import SettingsScreen from '../screens/SettingsScreen';
import AchievementsScreen from '../screens/AchievementsScreen';

const Tab = createBottomTabNavigator();

const getTabIcon = (routeName) => {
    switch (routeName) {
        case 'Home':
            return require('../assets/img/Group86.png');
        case 'HabitTracker':
            return require('../assets/img/Group87.png');
        case 'AchievementsScreen':
            return require('../assets/img/Group88.png');
        case 'SettingsScreen':
            return require('../assets/img/Group89.png');
        default:
            return require('../assets/img/Group86.png');
    }
};

const MainTabNavigator = () => {
    const navigation = useNavigation();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: { backgroundColor: '#1F2021', shadowColor: '#1F2021', height: 150 },
                headerTitleStyle: {
                    color: 'white',
                    fontFamily:'Quantico-BoldItalic',
                    fontSize: 40,
                },
                // headerShadowVisible: false,
                tabBarStyle: {
                    backgroundColor: '#1F2021',
                    height: 100,
                    paddingTop: 20,
                },
                tabBarIcon: () => (
                    <Image
                        source={getTabIcon(route.name)}
                        style={{ }}
                    />
                ),
            })}
        >

            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: '',
                    headerTitle: 'Home',
                }}
            />
            <Tab.Screen
                name="HabitTracker"
                component={HabitTracker}
                options={{
                    tabBarLabel: '',
                    headerTitle: 'Habit',
                }}
            />
            <Tab.Screen
                name="AchievementsScreen"
                component={AchievementsScreen}
                options={{
                    tabBarLabel: '',
                    headerTitle: 'Achievements',
                }}
            />

            <Tab.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    tabBarLabel: '',
                    headerTitle: 'Settings',

                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;

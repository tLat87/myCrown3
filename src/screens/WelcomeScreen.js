import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

const { width } = Dimensions.get('window');

const WelcomeScreens = ({ navigation }) => {
    const screens = [
        {
            title: 'Welcome to Your Journey',
            description: 'Start building the life you want by focusing on daily habits.\nMake small, consistent choices that lead to real growth.\nTrack your progress and celebrate wins along the way.',
            button: 'Next',
            icon: require('../assets/img/7195566a053642b16deae89621d18c43c9209736.png'),
        },
        {
            title: 'Stay Motivated, Grow Daily',
            description: 'Earn achievements for your efforts:\n• Build streaks by staying consistent\n• Unlock goals as you form better habits\n• Enjoy the process of becoming your best self',
            button: 'Next',
            // icon: require('../assets/img/91ca4d1199817f7d5d86b370624e194196d0ddfe.png'),
            icon: null,

        },
        {
            title: 'Personalize Your Experience',
            description: 'Answer a few quick questions to customize your habit tracker.\nWe’ll focus only on what matters to you — no clutter, just progress.',
            button: 'Start Survey',
            icon: require('../assets/img/b571355ba07c0707d17e7d1b9377b5f85c8d5a64.png'),
        }
    ];

    const [current, setCurrent] = useState(0);

    const handleNext = () => {
        if (current < screens.length - 1) {
            setCurrent(current + 1);
        } else {
            navigation.navigate('ProductivityCheck');
        }
    };

    const { title, description, button, icon } = screens[current];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <Image source={icon} style={[styles.image, current === 2 && {height: 500, marginVertical: -200}]} resizeMode="contain" />
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>{button}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default WelcomeScreens;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3a3a3a',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: '700',
        fontFamily:'Quantico-BoldItalic',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        color: '#cccccc',
        fontSize: 16,
        fontFamily:'Quantico-BoldItalic',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30,
    },
    image: {
        width: 300,
        height: 400,
        marginBottom: 0,
        // backgroundColor: '#000',
    },
    button: {
        backgroundColor: '#D2B161',
        borderColor: '#FFFFFF',
        borderWidth: 2,
        paddingVertical: 12,
        paddingHorizontal: 40,
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
        fontFamily:'Quantico-BoldItalic',
        fontSize: 26,
    },
});

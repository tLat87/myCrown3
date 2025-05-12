import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';

const { width } = Dimensions.get('window');

const WelcomeScreens = ({ navigation }) => {
    const screens = [
        {
            title: 'Welcome to Deserve Your Crown',
            description: 'Build your personal legacy by mastering your daily habits.\nEach day, deserve your crown by making small but powerful choices.\nTrack your progress, celebrate your wins, and stay loyal to your goals.',
            button: 'Next',
            icon: require('../assets/img/7195566a053642b16deae89621d18c43c9209736.png'),
        },
        {
            title: 'Achieve More, Rule Stronger',
            description: 'Get unique achievements for your daily victories:\n• Keep your crown shining by making positive choices\n• Unlock milestones for streaks and good habits\n• Celebrate every step toward becoming your best self',
            button: 'Next',
            icon: require('../assets/img/91ca4d1199817f7d5d86b370624e194196d0ddfe.png'),
        },
        {
            title: 'Set Your Crown Standards',
            description: 'Let\'s personalize your journey.\nWe\'ll ask a few quick questions to tailor the habits you want to track.\nOnly relevant habits will be included — no distractions, just your path to greatness.',
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
        backgroundColor: '#1a1a1a',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#ffffff',
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        color: '#cccccc',
        fontSize: 16,
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
        borderRadius: 8,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        paddingVertical: 12,
        paddingHorizontal: 40,
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 26,
    },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

export default function ProductivityCheck({navigation}) {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.iconContainer}>
                <Image
                    source={require('../assets/img/4c58e540460e5f9de360e844a54f5827f876d588.png')} // замените на свой путь к иконке
                    style={styles.icon}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.card}>
                <Text style={styles.question}>
                    Are you{'\n'}
                    focusing on{'\n'}
                    improving your{'\n'}
                    productivity?
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('MainTab');}}>
                        <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('MainTab');}}>
                        <Text style={styles.buttonText}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

// Стили
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 30,
    },
    icon: {
        width: 400,
        height: 450,
        tintColor: '#C7A553', // золотой
    },
    card: {
        backgroundColor: '#C7A553',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    question: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        fontFamily:'Quantico-BoldItalic',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        backgroundColor: '#94A98D',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 24,
    },
});

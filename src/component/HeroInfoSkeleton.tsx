import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Colors from '../constants/colors';


const HeroInfoSkeleton = () => {

    return (
        <View style={styles.container}>
            <View style={styles.image} />
            <View style={styles.card}>
            <View style={styles.title}></View>
            <View style={styles.title}></View>
            <View style={styles.title}></View>
            <View style={styles.title}></View>
            <View style={styles.title2}></View>
            <View style={styles.title2}></View>
            <View style={{ height: 100 }} />
            </View>
        </View>
    );
};

export default HeroInfoSkeleton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,
    },
    topButtonsContainer: {
        position: 'absolute',
        top: 60,
        left: 0,
        width: '95%',
        zIndex: 9999,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    circleButton: {
        padding: 8,
        borderRadius: 99,
        backgroundColor: Colors.primary,
        alignSelf: 'flex-start',
    },
    image: {
        width: '100%',
        height: 350,
        marginBottom: -30,
        backgroundColor: '#d8d8d8'
    },
    card: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        marginTop: -24,
    },
    title: {
        fontSize: 28,
        padding: 10,
        width: 200,
        backgroundColor: '#d8d8d8',
        borderRadius: 12,
        fontWeight: '700',
        marginBottom: 10,
    },
    title2: {
        fontSize: 28,
        padding: 100,
        width: 300,
        backgroundColor: '#d8d8d8',
        borderRadius: 12,
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 28,
        padding: 10,
        width: 200,
        backgroundColor: '#d8d8d8',
        borderRadius: 12,
    },
    description: {
        color: '#333',
        lineHeight: 20,
    },
    infoText: {
        color: '#444',
        marginLeft: 6,
        marginBottom: 4,
    },
    priceRow: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
    },
});

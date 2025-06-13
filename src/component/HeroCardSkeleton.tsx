import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import Colors from '../constants/colors';

const HeroCardSkeleton = () => {

    return (
        <View style={styles.card}>
            <View style={styles.imageWrapper}>
                <View style={styles.image} />

            </View>

            <View style={styles.infoContainer}>
                <View style={styles.title}></View>
                <View style={styles.subText}></View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginHorizontal: 20,
        marginVertical: 10,
        elevation: 3,
        overflow: 'hidden',
    },
    imageWrapper: {
        position: 'relative',
    },
    image: {
        height: 280,
        width: '95%',
        borderRadius: 16,
        marginVertical: 8,
        backgroundColor: '#e8e8e8',
        alignSelf: 'center',
    },
    iconButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 24,
        right: 9,
        width: 100,
        justifyContent: 'center',
    },
    iconText: {
        color: '#fff',
        padding: 8,
        width: 100,
        backgroundColor: '#e8e8e8',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
    },
    infoContainer: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222',
        padding: 8,
        borderRadius: 12,
        width: 100,
        backgroundColor: '#e8e8e8',
    },
    subText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222',
        padding: 8,
        marginTop: 8,
        borderRadius: 12,
        width: 100,
        backgroundColor: '#e8e8e8',
    },
});

export default HeroCardSkeleton;

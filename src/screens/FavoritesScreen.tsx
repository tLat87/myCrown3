import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {getHeroById} from "../api/superheroApi.ts";
import HeroCardSkeleton from "../component/HeroCardSkeleton.tsx";
import HeroCard from "../component/HeroCard.tsx";
import Colors from "../constants/colors";



const FavoritesScreen = () => {
    const [heroes, setHeroes] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const fetchFavorites = async () => {
                try {
                    setLoading(true);
                    const jsonValue = await AsyncStorage.getItem('favorites');
                    const favoriteIds = jsonValue ? JSON.parse(jsonValue) : [];

                    const heroResults = await Promise.all(
                        favoriteIds.map(id => getHeroById(id))
                    );

                    setHeroes(heroResults.filter(Boolean));
                } catch (error) {
                    console.error('Error loading favorites:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchFavorites();

            return () => {};
        }, [])
    );


    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.location}>Here are all your saved</Text>
            <Text style={[styles.location, styles.subtitle]}>heroes</Text>
        </View>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyWrapper}>
            <Image
                source={require('../assets/img/klipartz.com.png')}
                style={styles.emptyImage}
            />
            <Text style={styles.emptyText}>No saved heroes yet...</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container} scrollEnabled={!loading}>
            {renderHeader()}

            {loading ? (
                <>
                    <HeroCardSkeleton />
                    <HeroCardSkeleton />
                    <HeroCardSkeleton />
                </>
            ) : heroes.length === 0 ? (
                renderEmptyState()
            ) : (
                heroes.map(hero => <HeroCard key={hero.id} data={hero} />)
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        flex: 1,
    },
    header: {
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        height: 260,
    },
    location: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '900',
        textAlign: 'center',
    },
    subtitle: {
        color: Colors.textDark,
        backgroundColor: Colors.background,
        padding: 8,
        borderRadius: 16,
        marginTop: 12,
    },
    emptyWrapper: {
        position: 'relative',
        alignItems: 'center',
        marginTop: 80,
        minHeight: 400,
    },
    emptyImage: {
        width: 200,
        height: 300,
        resizeMode: 'contain',
    },
    emptyText: {
        marginTop: 20,
        color: '#000',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default FavoritesScreen;

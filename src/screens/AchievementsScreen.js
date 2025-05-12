import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import {useSelector} from 'react-redux';

const { width } = Dimensions.get('window');
const numColumns = 3;

const achievements = [
    { title: 'First Crown Shine', type: 'grey' },
    { title: 'First Chronicle Entry', type: 'grey' },
    { title: 'Steady Writer', type: 'grey' },
    { title: 'Consistent Light', type: 'grey' },
    { title: 'Early Riser', type: 'grey' },
    { title: 'Healthy Eater', type: 'grey' },
    { title: 'Daily Mover', type: 'grey' },
    { title: 'Screen Master', type: 'grey' },
    { title: 'Social Spirit', type: 'grey' },
    { title: 'Productivity Knight', type: 'grey' },
    { title: 'Emotional Guardian', type: 'grey' },
    { title: 'Mindful Eater', type: 'grey' },
    { title: 'Smoke-Free Squire', type: 'grey' },
    { title: 'Dry Noble', type: 'silver' },
    { title: 'Unbroken Ruler', type: 'grey' },
    { title: 'Crown Eternal', type: 'grey' },
    { title: 'Smoke-Free Champion', type: 'grey' },
    { title: 'Dry Royal', type: 'gold' },
];

const crownImages = {
    grey: require('../assets/img/fqytguhi.png'),
    silver: require('../assets/img/rtcfvygbuhinj.png'),
    gold: require('../assets/img/5drftyguhi.png'),
    placeholder: require('../assets/img/Group94.png'),
};

export default function AchievementsScreen() {

    const history = useSelector((state) => state.crowns.history);

    const days = [...Array(14)].map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const key = date.toISOString().split('T')[0];
        return { date: key, type: history[key] || 'placeholder' };
    }).reverse();

    function formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.grid}>
                {days.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Image source={crownImages[item.type]} style={styles.image} resizeMode="contain" />
                        <Text style={styles.title}>{formatDate(item.date)}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#1F2021',
        paddingTop: 50,
        paddingBottom: 40,
        alignItems: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    item: {
        width: width / numColumns - 20,
        alignItems: 'center',
        margin: 10,
    },
    image: {
        width: '100%',
        height: 80,
    },
    title: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily:'Quantico-BoldItalic',
        color: '#fff',
    },
});

import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import {useSelector} from 'react-redux';

function HomeScreen() {
    const darkMode = useSelector(state => state.theme.darkMode);

    // const history = useSelector((state) => state.crowns.history);
    // const goldCount = history.filter(item => item.crownType === 'gold').length;
    // const silverCount = history.filter(item => item.crownType === 'silver').length;
    // const brownCount = history.filter(item => item.crownType === 'brown').length;

    return (
        <SafeAreaView style={[styles.container, !darkMode && {backgroundColor: '#a69f89'}]}>
            {/* Первая секция */}
            <Text style={styles.text}>
                Majesty, your sparkled{' '}
                <Text style={styles.highlight}>{0}</Text> days this week.
            </Text>
            {/*<Image*/}
            {/*    source={require('../assets/img/33f646d30889b86451d4e636dfe5d2e1cd97a930.png')} // замените на путь к иконке короны*/}
            {/*    style={styles.icon}*/}
            {/*    resizeMode="contain"*/}
            {/*/>*/}

            {/* Вторая секция */}
            <Text style={styles.text}>
                You logged entries for{' '}
                <Text style={styles.highlight}>{0}</Text> consecutive days.
            </Text>
            <Image
                source={require('../assets/img/a768faf6ad55b788842918722ab9c6269416a80a.png')} // замените на путь к иконке короны
                style={styles.icon}
                resizeMode="contain"
            />
        </SafeAreaView>
    );
}

// Стили
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F2021',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 20,
        color: 'white',
        fontFamily:'Quantico-BoldItalic',
        fontWeight: 'bold',
        textAlign: 'center',
        // marginVertical: 10,
        marginHorizontal: 20,
    },
    highlight: {
        color: '#C7A553', // золотой
    },
    icon: {
        width: 400,
        height: 260,
        marginBottom: 0,
        tintColor: '#C7A553', // если используете одноцветную PNG
    },
});

export default HomeScreen

import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { getHeroById } from '../api/superheroApi';
import BackBtnSvg from '../assets/svg/BackBtnSvg';
import StarSvg from '../assets/svg/StarSvg';
import Colors from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeroInfoSkeleton from "../component/HeroInfoSkeleton.tsx";

type RootStackParamList = {
    HeroInfoScreen: { id: string };
};

type HeroInfoScreenRouteProp = RouteProp<RootStackParamList, 'HeroInfoScreen'>;

interface Hero {
    id: string;
    name: string;
    image: {
        url: string;
    };
    biography: {
        'full-name': string;
        'place-of-birth': string;
        publisher: string;
        'first-appearance': string;
        alignment: string;
        aliases?: string[];
    };
    powerstats: Record<string, string | number>;
    appearance: {
        gender: string;
        race: string;
        height: string[];
        weight: string[];
        'eye-color': string;
        'hair-color': string;
    };
    work: {
        occupation: string;
        base: string;
    };
    connections: {
        'group-affiliation': string;
        relatives: string;
    };
}

const HeroInfoScreen: React.FC = () => {
    const route = useRoute<HeroInfoScreenRouteProp>();
    const navigation = useNavigation();
    const { id } = route.params;

    const [hero, setHero] = useState<Hero | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);

    const checkIfFavorite = useCallback(async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('favorites');
            const favorites: string[] = jsonValue ? JSON.parse(jsonValue) : [];
            setIsFavorite(favorites.includes(id));
        } catch (error) {
            console.error('Error reading favorites from storage', error);
        }
    }, [id]);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const data = await getHeroById(id);
                setHero(data);
            } catch (error) {
                console.error('Error fetching hero data:', error);
            }
        };

        fetchHero();
        checkIfFavorite();
    }, [id, checkIfFavorite]);

    const toggleFavorite = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('favorites');
            const favorites: string[] = jsonValue ? JSON.parse(jsonValue) : [];

            let updatedFavorites: string[];
            if (favorites.includes(id)) {
                updatedFavorites = favorites.filter(favId => favId !== id);
                Alert.alert('Removed from Favorites');
            } else {
                updatedFavorites = [...favorites, id];
                Alert.alert('Added to Favorites');
            }

            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(updatedFavorites.includes(id));
        } catch (error) {
            console.error('Error updating favorites:', error);
            Alert.alert('Error updating favorites');
        }
    };

    if (!hero) {
        return <HeroInfoSkeleton />;
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.topButtonsContainer}>
                <TouchableOpacity
                    style={styles.circleButton}
                    onPress={() => navigation.goBack()}
                >
                    <BackBtnSvg width={30} height={30} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.circleButton}
                    onPress={toggleFavorite}
                >
                    <StarSvg
                        width={30}
                        height={30}
                        color="#fff"
                        fill={isFavorite ? '#fff' : 'transparent'}
                    />
                </TouchableOpacity>
            </View>

            <Image source={{ uri: hero.image.url }} style={styles.image} />

            <View style={styles.card}>
                <Text style={styles.title}>{hero.name}</Text>

                <Section title="Full Name" value={hero.biography['full-name']} />
                <Section title="Place of Birth" value={hero.biography['place-of-birth']} />
                <Section title="Publisher" value={hero.biography.publisher} />
                <Section title="First Appearance" value={hero.biography['first-appearance']} />
                <Section title="Alignment" value={hero.biography.alignment} />

                <Section
                    title="Aliases"
                    value={hero.biography.aliases?.length ? hero.biography.aliases.join(', ') : 'Not available'}
                />

                <Section title="Powerstats" />
                {Object.entries(hero.powerstats).map(([key, value]) => (
                    <Text key={key} style={styles.infoText}>
                        {key}: {value}
                    </Text>
                ))}

                <Section title="Appearance" />
                <Text style={styles.infoText}>Gender: {hero.appearance.gender}</Text>
                <Text style={styles.infoText}>Race: {hero.appearance.race}</Text>
                <Text style={styles.infoText}>Height: {hero.appearance.height.join(' / ')}</Text>
                <Text style={styles.infoText}>Weight: {hero.appearance.weight.join(' / ')}</Text>
                <Text style={styles.infoText}>Eye Color: {hero.appearance['eye-color']}</Text>
                <Text style={styles.infoText}>Hair Color: {hero.appearance['hair-color']}</Text>

                <Section title="Occupation" value={hero.work.occupation} />
                <Section title="Base" value={hero.work.base} />

                <Section title="Group Affiliation" value={hero.connections['group-affiliation']} />
                <Section title="Relatives" value={hero.connections.relatives} />

                <View style={styles.priceRow}>
                    <Text style={styles.price}>Combat: {hero.powerstats.combat}</Text>
                </View>

                <View style={{ height: 100 }} />
            </View>
        </ScrollView>
    );
};

interface SectionProps {
    title: string;
    value?: string | number | null;
}

const Section: React.FC<SectionProps> = ({ title, value }) => (
    <>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.description}>{value ? value : 'Not available'}</Text>
    </>
);

export default HeroInfoScreen;

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
        fontWeight: '700',
        marginBottom: 10,
    },
    sectionTitle: {
        fontWeight: '600',
        fontSize: 18,
        marginTop: 14,
        marginBottom: 4,
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

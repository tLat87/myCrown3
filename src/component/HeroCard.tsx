import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ChevronRigSvg from '../assets/svg/ChevronRigSvg.tsx';
import Colors from '../constants/colors';

// Типизация объекта героя
interface HeroData {
    id: string;
    name: string;
    image: {
        url: string;
    };
    biography: {
        alignment: string;
    };
}

interface HeroCardProps {
    data: HeroData;
}

const HeroCard: React.FC<HeroCardProps> = ({ data }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.card}>
            <View style={styles.imageWrapper}>
                <Image source={{ uri: data.image.url }} style={styles.image} />
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => navigation.navigate('HeroInfoScreen' as never, { id: data.id } as never)}
                >
                    <Text style={styles.iconText}>More</Text>
                    <ChevronRigSvg width={20} height={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{data.name}</Text>
                <Text style={styles.subText}>Alignment: {data.biography.alignment || 'Unknown'}</Text>
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
    },
    subText: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
});

export default HeroCard;

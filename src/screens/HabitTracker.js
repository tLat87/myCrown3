import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView, Alert, Image, Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addCrownForToday} from '../redux/slices/crownsSlice';

const habitsList = [
    'Woke up early',
    'Avoided alcohol',
    'Did not smoke',
    'Ate healthy',
    'Exercised or moved',
    'Controlled screen time',
    'Connected with someone',
    'Was productive',
    'Stayed emotionally balanced',
    'Avoided overeating',
];

export default function HabitTracker() {
    const [responses, setResponses] = useState({});
    const dispatch = useDispatch();
    const history = useSelector((state) => state.crowns.history);
    const today = new Date().toISOString().split('T')[0];
    const [showModal, setShowModal] = useState(false);
    const [earnedCrown, setEarnedCrown] = useState(null);


    function evaluateCrown(responses) {
        const total = Object.keys(responses).length;
        const positive = Object.values(responses).filter((val) => val === 'yes').length;

        const ratio = positive / total;

        if (ratio >= 0.9) return 'gold';
        if (ratio >= 0.6) return 'silver';
        return 'brown';
    }

    const handleSubmit = () => {
        if (history[today]) {
            setEarnedCrown(null);
            setShowModal(true);
            return;
        }

        const crown = evaluateCrown(responses);
        dispatch(addCrownForToday({ crownType: crown }));
        setEarnedCrown(crown);
        setShowModal(true);
    };



    const handleSelect = (habit, value) => {
        setResponses((prev) => ({ ...prev, [habit]: value }));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerSpacer}></Text>
                <Text style={styles.header}>Yes</Text>
                <Text style={styles.header}>No</Text>
            </View>

            {habitsList.map((habit) => (
                <View key={habit} style={styles.row}>
                    <Text style={styles.label}>{habit}</Text>
                    <TouchableOpacity
                        style={[
                            styles.checkbox,
                            responses[habit] === 'yes' && styles.checkboxYes,
                        ]}
                        onPress={() => handleSelect(habit, 'yes')}
                    />
                    <TouchableOpacity
                        style={[
                            styles.checkbox,
                            responses[habit] === 'no' && styles.checkboxNo,
                        ]}
                        onPress={() => handleSelect(habit, 'no')}
                    />
                </View>
            ))}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Record the Reign</Text>
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalText}>
                            {earnedCrown
                                ? 'Your crown shines with honor today.\nWell done,\nSovereign of Discipline!'
                                : 'You\'ve already recorded today!'}
                        </Text>
                        {earnedCrown && (
                            <Image
                                source={require('../assets/img/4dbe06d2038465660248adf29062c55fb4d9e5b5.png')} // замени на путь к иконке
                                style={styles.crownImage}
                                resizeMode="contain"
                            />
                        )}
                    </View>
                </View>
            </Modal>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#1F2021',
        alignItems: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#D5B76F',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        width: '80%',
        borderWidth: 1,
        borderColor: '#fff',
    },
    modalText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    crownImage: {
        width: 60,
        height: 60,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },

    headerSpacer: {
        width: '70%',
    },
    header: {
        width: 40,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    label: {
        color: 'white',
        width: '70%',
        fontFamily:'Quantico-BoldItalic',
        fontSize: 20,
        fontWeight: '600',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#fff',
        marginHorizontal: 15,
    },
    checkboxYes: {
        backgroundColor: '#7BAF91',
    },
    checkboxNo: {
        backgroundColor: '#B26456',
    },
    button: {
        marginTop: 30,
        backgroundColor: '#D5B76F',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    buttonText: {
        color: '#000',
        fontSize: 28,
        fontFamily:'Quantico-BoldItalic',
        fontWeight: 'bold',
    },
});

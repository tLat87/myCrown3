import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Modal, Switch} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleMusic} from '../redux/slices/settingsSlice';
import Share from 'react-native-share';
import {clearCrowns} from '../redux/slices/crownsSlice';
import {toggleTheme} from '../redux/slices/themeSlice';

export default function SettingsScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const dispatch = useDispatch();
    const musicOn = useSelector(state => state.settings.musicOn);

    const handleShare = async () => {
        try {
            const shareOptions = {
                title: 'My Royal Streak',
                message: 'Join me in tracking noble habits and earning daily crowns! 👑',
                // url: 'https://your-app-link.com', // можно заменить или удалить
            };
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Share error:', error);
        }
    };

    const darkMode = useSelector(state => state.theme.darkMode);

    return (
        <View style={[styles.container, !darkMode && {backgroundColor: '#a69f89'}]}>

            <TouchableOpacity style={styles.button} onPress={() => dispatch(toggleMusic())}>
                <Text style={styles.buttonText}>Royal Tunes</Text>
                <Text style={[styles.buttonText, {marginLeft: 50}]}>{musicOn ? 'ON' : 'OFF'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Theme</Text>
                <Switch
                    value={darkMode}
                    onValueChange={() => dispatch(toggleTheme())}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
                    style={{ marginLeft: 50 }}
                />
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>Begin a New Reign</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleShare}>
                <Text style={styles.buttonText}>Spread the Crown</Text>
            </TouchableOpacity>


            <Modal transparent={true} animationType="fade" visible={modalVisible}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Are you certain, Your Majesty?</Text>
                        <Text style={styles.modalText}>
                            Abandoning your progress will erase all records of your reign.
                            {'\n'}Are you sure you wish to begin anew?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.resetButton} onPress={() => {
                               dispatch(clearCrowns())
                                setModalVisible(false);
                            }}>
                                <Text style={styles.resetText}>Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F2021',
        padding: 20,
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#D5B76F',
        paddingVertical: 24,
        paddingHorizontal: 20,
        marginBottom: 20,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily:'Quantico-BoldItalic',
    },
    icon: {
        marginLeft: 10,
    },


    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#D5B76F',
        padding: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'white',
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily:'Quantico-BoldItalic',
        marginBottom: 12,
        color: '#000',
    },
    modalText: {
        fontSize: 14,
        fontFamily:'Quantico-BoldItalic',
        textAlign: 'center',
        color: '#000',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    resetButton: {
        backgroundColor: '#C2705A',
        flex: 1,
        marginRight: 10,
        padding: 12,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'white',
    },
    cancelButton: {
        backgroundColor: '#7FB393',
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'white',
    },
    resetText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        fontSize: 16,
        color: '#000',
    },
    cancelText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        fontSize: 16,
        color: '#000',
    },
});


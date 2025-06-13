import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Colors from '../constants/colors';

type StatKey = 'intelligence' | 'strength' | 'speed' | 'durability' | 'power' | 'combat';
type Alignment = 'good' | 'bad' | 'neutral';

interface Filters {
    stats: StatKey[];
    alignment: Alignment[];
}

interface FilterModalProps {
    visible: boolean;
    filters: Filters;
    onClose: () => void;
    onApply: () => void;
    onToggle: (type: 'stats' | 'alignment', value: StatKey | Alignment) => void;
}

const STAT_KEYS: StatKey[] = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'];
const ALIGNMENTS: Alignment[] = ['good', 'bad', 'neutral'];

const FilterModal: React.FC<FilterModalProps> = ({
                                                     visible,
                                                     filters,
                                                     onClose,
                                                     onApply,
                                                     onToggle,
                                                 }) => {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Filters</Text>

                    <Text style={styles.section}>Powerstats</Text>
                    {STAT_KEYS.map((key) => (
                        <TouchableOpacity
                            key={key}
                            style={styles.option}
                            onPress={() => onToggle('stats', key)}
                        >
                            <Text style={styles.optionText}>{key.toUpperCase()}</Text>
                            <Text>{filters.stats.includes(key) ? '✅' : '⬜️'}</Text>
                        </TouchableOpacity>
                    ))}

                    <Text style={styles.section}>Alignment</Text>
                    {ALIGNMENTS.map((al) => (
                        <TouchableOpacity
                            key={al}
                            style={styles.option}
                            onPress={() => onToggle('alignment', al)}
                        >
                            <Text style={styles.optionText}>{al.toUpperCase()}</Text>
                            <Text>{filters.alignment.includes(al) ? '✅' : '⬜️'}</Text>
                        </TouchableOpacity>
                    ))}

                    <View style={styles.actions}>
                        <TouchableOpacity onPress={onClose} style={styles.button}>
                            <Text
                                style={{
                                    fontFamily: 'BebasNeue-Regular',
                                    fontSize: 20,
                                    textDecorationLine: 'underline',
                                }}
                            >
                                Close
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onApply}
                            style={[styles.button, styles.apply]}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontFamily: 'BebasNeue-Regular',
                                    fontSize: 20,
                                }}
                            >
                                Apply
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: 25 }} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontSize: 30,
        fontFamily: 'BebasNeue-Regular',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    section: {
        fontSize: 22,
        fontFamily: 'BebasNeue-Regular',
        marginTop: 20,
        fontWeight: '600',
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    optionText: {
        fontSize: 16,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        padding: 10,
    },
    apply: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        paddingHorizontal: 20,
    },
});

export default FilterModal;

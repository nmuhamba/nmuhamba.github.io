// Style sheet for the Home screen

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: "#ffffff",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
    },
    statusBox: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 12,
    },
    statusText: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: '500',
    },
    keyLabel: {
        marginTop: 12,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#A09CAB',
        marginVertical: 16,
    },
    policyCard: {
        height: 100,
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        marginBottom: 12,
        padding: 10,
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    notClearedBox: {
        backgroundColor: '#ffe6e6',
    },
    statusEmoji: {
        fontSize: 40,
        marginBottom: 10,
    },
});

export default styles;
// Style sheet for top panel component

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingBottom: 12,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
    },
    sideIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    centerImage: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
});

export default styles;
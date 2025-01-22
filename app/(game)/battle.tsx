import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

import BATTLE_IMAGE from '../../assets/images/maps/battle1.png';

const BattleScreen: React.FC = () => {
    const router = useRouter();

    const endBattle = () => {
        router.push('/(game)/map'); // Navigate back to the map
    };

    return (
        <ImageBackground
            source={BATTLE_IMAGE}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.text}>Battle in Progress</Text>
                <Button title="Finish Battle" onPress={endBattle} />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        // The rest of your background styling (if needed)
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default BattleScreen;

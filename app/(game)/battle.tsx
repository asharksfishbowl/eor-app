import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const BattleScreen: React.FC = () => {
    const router = useRouter();

    const endBattle = () => {
        router.push('/(game)/map'); // Navigate back to the map
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Battle in Progress</Text>
            <Button title="Finish Battle" onPress={endBattle} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    text: {
        color: 'white',
        fontSize: 20,
        marginBottom: 20,
    },
});

export default BattleScreen;

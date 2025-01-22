import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity,
    Text,
    Image,
    ImageBackground,
} from 'react-native';
import { GameEngine, GameEngineUpdateEventOptionType } from 'react-native-game-engine';
import { useRouter } from 'expo-router';

import PLAYER_IMAGE from '../../assets/images/player/player1.png';
import ENEMY_IMAGE from '../../assets/images/enemy/enemy1.png';
import MAP_IMAGE from '../../assets/images/maps/map1.png';

type Position = [number, number];

interface Entity {
    position: Animated.ValueXY;
    renderer: React.FC<{ position: Animated.ValueXY }>;
}

interface Entities {
    [key: string]: Entity;
}

const { width, height } = Dimensions.get('window');

const getRandomPosition = (): Position => [
    Math.random() * (width - 60),
    Math.random() * (height - 60),
];

const MapScreen: React.FC = () => {
    const router = useRouter();

    // Player
    const playerPosition = useRef(new Animated.ValueXY({ x: 100, y: 100 })).current;
    const [playerXY, setPlayerXY] = useState<Position>([100, 100]);

    // Enemies
    const [entities, setEntities] = useState<Entities | null>(null);
    const [enemyPositions, setEnemyPositions] = useState<Record<string, Position>>({});

    // Flag
    const [inBattle, setInBattle] = useState(false);

    useEffect(() => {
        const initialEntities: Entities = {
            player: {
                position: playerPosition,
                renderer: ({ position }) => (
                    <Animated.View
                        style={{
                            position: 'absolute',
                            transform: [
                                { translateX: position.x },
                                { translateY: position.y },
                            ],
                            width: 60,
                            height: 60,
                        }}
                    >
                        <Image source={PLAYER_IMAGE} style={{ width: 60, height: 60 }} />
                    </Animated.View>
                ),
            },
        };

        const newEnemyPositions: Record<string, Position> = {};
        for (let i = 0; i < 5; i++) {
            const [x, y] = getRandomPosition();
            const enemyPosition = new Animated.ValueXY({ x, y });
            newEnemyPositions[`enemy_${i}`] = [x, y];

            initialEntities[`enemy_${i}`] = {
                position: enemyPosition,
                renderer: ({ position }) => (
                    <Animated.View
                        style={{
                            position: 'absolute',
                            transform: [
                                { translateX: position.x },
                                { translateY: position.y },
                            ],
                            width: 60,
                            height: 60,
                        }}
                    >
                        <Image source={ENEMY_IMAGE} style={{ width: 60, height: 60 }} />
                    </Animated.View>
                ),
            };
        }

        setEntities(initialEntities);
        setEnemyPositions(newEnemyPositions);
    }, []);

    const moveToPosition = (entity: Animated.ValueXY, x: number, y: number) => {
        Animated.timing(entity, {
            toValue: { x, y },
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    // Move player on press
    const MovePlayer = (
        entitiesParam: Entities,
        { touches }: GameEngineUpdateEventOptionType
    ): Entities => {
        if (inBattle) return entitiesParam;

        const press = touches.find((t) => t.type === 'press');
        if (press) {
            const { pageX, pageY } = press.event;
            const targetX = Math.min(Math.max(0, pageX - 30), width - 60);
            const targetY = Math.min(Math.max(0, pageY - 30), height - 60);

            setPlayerXY([targetX, targetY]);
            moveToPosition(playerPosition, targetX, targetY);
        }

        return entitiesParam;
    };

    // Random move enemies, check collision
    const MoveEnemies = (entitiesParam: Entities): Entities => {
        if (inBattle) return entitiesParam;

        setEnemyPositions((prev) => {
            const updated = { ...prev };

            Object.keys(prev).forEach((key) => {
                if (key.startsWith('enemy_')) {
                    const [ex, ey] = prev[key];
                    const targetX = Math.min(Math.max(0, ex + Math.random() * 40 - 20), width - 60);
                    const targetY = Math.min(Math.max(0, ey + Math.random() * 40 - 20), height - 60);

                    moveToPosition(entitiesParam[key].position, targetX, targetY);
                    updated[key] = [targetX, targetY];

                    const collisionDistance = 10;
                    const [px, py] = playerXY;
                    const dx = px - targetX;
                    const dy = py - targetY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < collisionDistance && !inBattle) {
                        console.log('Collision happened!');
                        console.log('Enemy:', updated[key]);
                        console.log('Player:', playerXY);
                        setInBattle(true);
                        // Navigate to battle screen:
                        router.push('/(game)/battle');
                    }
                }
            });

            return updated;
        });

        return entitiesParam;
    };

    if (!entities) {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'white' }}>Loading...</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={MAP_IMAGE}
            style={styles.background}
            resizeMode="cover"
        >
        <View style={{ flex: 1 }}>
            <GameEngine
                style={styles.container}
                systems={[MovePlayer, MoveEnemies]}
                entities={entities}
            />
            <TouchableOpacity
                style={styles.castleButton}
                onPress={() => router.push('/(tabs)/campaign')}
            >
                <Text style={styles.buttonText}>🏰</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        // The rest of your background styling (if needed)
    },
    container: {
        flex: 1,
        // backgroundColor: 'green',
    },
    castleButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        borderRadius: 25,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    battleText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default MapScreen;

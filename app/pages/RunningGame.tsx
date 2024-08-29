import React, { useState, useEffect } from 'react';
import { View, Animated, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import RunningMan from '../components/RunningMan';
import Background from '../components/Background';

export default function RunningGame() {
  const [jump, setJump] = useState(new Animated.Value(0));
  const [obstaclePosition] = useState(new Animated.Value(300));

  // Faire sauter le bonhomme
  const handleJump = () => {
    Animated.sequence([
      Animated.timing(jump, {
        toValue: -150, // Hauteur du saut
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(jump, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Déplacement des caisses
  useEffect(() => {
    const moveObstacle = () => {
      obstaclePosition.setValue(300); // Réinitialiser la position de départ
      Animated.timing(obstaclePosition, {
        toValue: -100,
        duration: 2000,
        useNativeDriver: false,
      }).start(() => {
        moveObstacle(); // Boucle pour faire défiler les caisses
      });
    };

    moveObstacle();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handleJump}>
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        {/* Fond défilant */}
        <View style={styles.container}>
          <Background />
            {/* Autres composants de ton application */}
        </View>

        {/* Bonhomme */}
        <Animated.View
          style={{
            transform: [{ translateY: jump }],
            position: 'absolute',
            bottom: 50, // Position de départ
            left: 50,
          }}
        >
          <RunningMan />
        </Animated.View>

        {/* Caisse */}
        <Animated.View
          style={{
            transform: [{ translateX: obstaclePosition }],
            position: 'absolute',
            bottom: 50,
            width: 50,
            height: 50,
            backgroundColor: 'brown', // Vous pouvez utiliser une image ici
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

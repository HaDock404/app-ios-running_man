import React, { useState, useEffect } from 'react';
import { View, Image, Animated, TouchableWithoutFeedback } from 'react-native';

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
        useNativeDriver: true,
      }).start(() => {
        moveObstacle(); // Boucle pour faire défiler les caisses
      });
    };

    moveObstacle();
  }, [obstaclePosition]);

  return (
    <TouchableWithoutFeedback onPress={handleJump}>
      <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        {/* Fond défilant */}
        <Image
          source={{ uri: 'https://www.megavoxels.com/wp-content/uploads/2023/06/Pixel-Art-House.png' }} // Remplacez par l'URL de votre image de fond
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />

        {/* Bonhomme */}
        <Animated.View
          style={{
            transform: [{ translateY: jump }],
            position: 'absolute',
            bottom: 50, // Position de départ
            left: 50,
          }}
        >
          <Image
            source={{ uri: 'https://c7.alamy.com/comp/2C3FM8X/vector-pixel-art-man-running-isolated-cartoon-2C3FM8X.jpg' }} // Remplacez par l'URL de votre image de bonhomme
            style={{ width: 50, height: 50 }}
          />
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

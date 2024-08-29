import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';


const SPRITE_WIDTH = 100; // Largeur d'une frame de l'image sprite
const SPRITE_HEIGHT = 100; // Hauteur d'une frame de l'image sprite
const SPRITE_FRAMES = 3; // Nombre total de frames dans l'image sprite
const ANIMATION_SPEED = 100; // Durée de chaque frame en millisecondes

const RunningMan: React.FC = () => {
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Créer une séquence d'animations pour chaque frame
    const frameAnimations = [];
    for (let i = 0; i < SPRITE_FRAMES; i++) {
      frameAnimations.push(
        Animated.timing(animationValue, {
          toValue: i,
          duration: 0, // Transition instantanée
          useNativeDriver: false,
        }),
        Animated.delay(ANIMATION_SPEED) // Pause entre les frames
      );
    }

    // Boucler l'animation
    Animated.loop(Animated.sequence(frameAnimations)).start();
  }, [animationValue]);

  // Calculer la position de l'image sprite en fonction de l'animation
  const translateX = animationValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, -SPRITE_WIDTH, -SPRITE_WIDTH * 2],
  });

  return (
    <View style={styles.spriteContainer}>
      <Animated.Image
        source={require('../assets/running_man.png')}
        style={[
          styles.sprite,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spriteContainer: {
    width: SPRITE_WIDTH, // Largeur visible du sprite
    height: SPRITE_HEIGHT, // Hauteur visible du sprite
    overflow: 'hidden', // Cache les parties de l'image en dehors de la vue
  },
  sprite: {
    width: SPRITE_WIDTH * SPRITE_FRAMES, // Largeur totale de l'image sprite
    height: SPRITE_HEIGHT, // Hauteur de l'image sprite
  },
});

export default RunningMan;

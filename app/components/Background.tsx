import React, { useRef, useEffect } from 'react';
import { Animated, View, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Background: React.FC = () => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const scrollAnimation = Animated.loop(
      Animated.timing(translateX, {
        toValue: -SCREEN_WIDTH, // Défile vers la gauche sur toute la largeur de l'écran
        duration: 10000,        // Durée du défilement (en millisecondes)
        useNativeDriver: false, // Désactivé ici car il causait des problèmes, mais peut être réactivé si le module natif est configuré
      })
    );

    scrollAnimation.start();

    return () => scrollAnimation.stop(); // Arrête l'animation si le composant est démonté
  }, [translateX]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/X.png')} // Première image du fond
        style={[
          styles.backgroundImage,
          {
            transform: [{ translateX: translateX }], // Animation de translation
          },
        ]}
        resizeMode="cover"
      />
      <Animated.Image
        source={require('../assets/X.png')} // Deuxième image pour continuer le fond
        style={[
          styles.backgroundImage,
          {
            left: SCREEN_WIDTH, // La deuxième image commence là où la première finit
            transform: [{ translateX: translateX }], // Utilise la même animation de translation
          },
        ]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden', // Cache les parties des images qui dépassent l'écran
  },
  backgroundImage: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});

export default Background;

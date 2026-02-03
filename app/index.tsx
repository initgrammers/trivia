import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { router } from 'expo-router';
import { TriviaColors } from '@/constants/theme';

const screenHeight = Dimensions.get('window').height;

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={{
            animationName: {
              '0%': { transform: [{ scale: 0.8 }, { translateY: -20 }], opacity: 0 },
              '100%': { transform: [{ scale: 1 }, { translateY: 0 }], opacity: 1 },
            },
            animationDuration: '800ms',
          }}
        >
          <Animated.Text
            style={[
              styles.mascot,
              {
                animationName: {
                  '0%, 100%': { transform: [{ rotate: '-10deg' }] },
                  '50%': { transform: [{ rotate: '10deg' }] },
                },
                animationDuration: '2000ms',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out',
              },
            ]}
          >
            🧠
          </Animated.Text>
        </Animated.View>

        <Animated.Text
          style={[
            styles.title,
            {
              animationName: {
                '0%': { opacity: 0, transform: [{ translateY: 20 }] },
                '100%': { opacity: 1, transform: [{ translateY: 0 }] },
              },
              animationDuration: '800ms',
              animationDelay: '200ms',
              animationFillMode: 'backwards',
            },
          ]}
        >
          TRIVIA
        </Animated.Text>

        <Animated.Text
          style={[
            styles.subtitle,
            {
              animationName: {
                '0%': { opacity: 0, transform: [{ translateY: 20 }] },
                '100%': { opacity: 1, transform: [{ translateY: 0 }] },
              },
              animationDuration: '800ms',
              animationDelay: '400ms',
              animationFillMode: 'backwards',
            },
          ]}
        >
          Pon a prueba tus conocimientos
        </Animated.Text>

        <Animated.View
          style={{
            animationName: {
              '0%': { opacity: 0, transform: [{ scale: 0.8 }] },
              '100%': { opacity: 1, transform: [{ scale: 1 }] },
            },
            animationDuration: '600ms',
            animationDelay: '600ms',
            animationFillMode: 'backwards',
          }}
        >
          <Pressable
            onPress={() => router.push('/categories')}
            style={({ pressed }) => [
              styles.playButtonContainer,
              pressed && styles.playButtonPressed,
            ]}
          >
            <View style={styles.playButton}>
              <Animated.View
                style={{
                  animationName: {
                    '0%, 100%': { transform: [{ scale: 1 }] },
                    '50%': { transform: [{ scale: 1.05 }] },
                  },
                  animationDuration: '2000ms',
                  animationIterationCount: 'infinite',
                  animationTimingFunction: 'ease-in-out',
                }}
              >
                <Animated.Text style={styles.playButtonText}>JUGAR</Animated.Text>
              </Animated.View>
            </View>
          </Pressable>
        </Animated.View>

        <Animated.View
          style={[
            styles.decorativeCircle,
            styles.circle1,
            {
              animationName: {
                '0%, 100%': { transform: [{ scale: 1 }, { translateX: 0 }] },
                '50%': { transform: [{ scale: 1.2 }, { translateX: 10 }] },
              },
              animationDuration: '4000ms',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
            },
          ]}
        />
        <Animated.View
          style={[
            styles.decorativeCircle,
            styles.circle2,
            {
              animationName: {
                '0%, 100%': { transform: [{ scale: 1 }, { translateY: 0 }] },
                '50%': { transform: [{ scale: 1.3 }, { translateY: -15 }] },
              },
              animationDuration: '5000ms',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
            },
          ]}
        />
        <Animated.View
          style={[
            styles.decorativeCircle,
            styles.circle3,
            {
              animationName: {
                '0%, 100%': { transform: [{ scale: 1 }] },
                '50%': { transform: [{ scale: 1.15 }] },
              },
              animationDuration: '3500ms',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TriviaColors.primary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  mascot: {
    fontSize: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 64,
    fontWeight: '900',
    color: TriviaColors.textLight,
    letterSpacing: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 60,
    textAlign: 'center',
    fontWeight: '500',
  },
  playButtonContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  playButtonPressed: {
    transform: [{ scale: 0.95 }],
  },
  playButton: {
    paddingHorizontal: 80,
    paddingVertical: 24,
    borderRadius: 30,
    backgroundColor: TriviaColors.success,
  },
  playButtonText: {
    fontSize: 32,
    fontWeight: '900',
    color: TriviaColors.textLight,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  circle1: {
    width: 200,
    height: 200,
    top: 50,
    right: -50,
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: 100,
    left: -30,
  },
  circle3: {
    width: 100,
    height: 100,
    top: screenHeight * 0.3,
    left: 30,
  },
});

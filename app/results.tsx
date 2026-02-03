import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { router, useLocalSearchParams } from 'expo-router';
import { TriviaColors } from '@/constants/theme';
import { Confetti } from '@/components/confetti';

export default function ResultsScreen() {
  const params = useLocalSearchParams<{ score: string; total: string }>();
  const score = Number.parseInt(params.score || '0', 10);
  const total = Number.parseInt(params.total || '10', 10);
  
  const [displayScore, setDisplayScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const percentage = (score / total) * 100;
  const stars = percentage >= 80 ? 3 : percentage >= 60 ? 2 : percentage >= 40 ? 1 : 0;

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const increment = score / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(interval);
        
        if (percentage >= 60) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      } else {
        setDisplayScore(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [score, percentage]);

  const getMessage = () => {
    if (percentage >= 80) return '¡Excelente!';
    if (percentage >= 60) return '¡Muy bien!';
    if (percentage >= 40) return '¡Bien hecho!';
    return '¡Sigue intentando!';
  };

  return (
    <View style={styles.container}>
      <Confetti active={showConfetti} />
      
      <Animated.View
        style={[
          styles.content,
          {
            animationName: {
              '0%': { opacity: 0, transform: [{ scale: 0.9 }] },
              '100%': { opacity: 1, transform: [{ scale: 1 }] },
            },
            animationDuration: '600ms',
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.title,
            {
              animationName: {
                '0%': { opacity: 0, transform: [{ translateY: -20 }] },
                '100%': { opacity: 1, transform: [{ translateY: 0 }] },
              },
              animationDuration: '600ms',
              animationDelay: '200ms',
              animationFillMode: 'backwards',
            },
          ]}
        >
          {getMessage()}
        </Animated.Text>

        <Animated.View
          style={[
            styles.scoreContainer,
            {
              animationName: {
                '0%': { opacity: 0, transform: [{ scale: 0.5 }] },
                '100%': { opacity: 1, transform: [{ scale: 1 }] },
              },
              animationDuration: '800ms',
              animationDelay: '400ms',
              animationFillMode: 'backwards',
            },
          ]}
        >
          <Animated.Text style={styles.score}>
            {displayScore}
          </Animated.Text>
          <Animated.Text style={styles.total}>
            / {total}
          </Animated.Text>
        </Animated.View>

        <Animated.Text
          style={[
            styles.subtitle,
            {
              animationName: {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
              },
              animationDuration: '600ms',
              animationDelay: '600ms',
              animationFillMode: 'backwards',
            },
          ]}
        >
          Respuestas correctas
        </Animated.Text>

        <View style={styles.starsContainer}>
          {[1, 2, 3].map((star) => (
            <StarIcon key={star} filled={star <= stars} index={star} />
          ))}
        </View>

        <Animated.View
          style={{
            animationName: {
              '0%': { opacity: 0, transform: [{ translateY: 20 }] },
              '100%': { opacity: 1, transform: [{ translateY: 0 }] },
            },
            animationDuration: '600ms',
            animationDelay: '1000ms',
            animationFillMode: 'backwards',
          }}
        >
          <Pressable
            onPress={() => router.replace('/')}
            style={({ pressed }) => [
              styles.playAgainButton,
              pressed && styles.playAgainButtonPressed,
            ]}
          >
            <Animated.Text style={styles.playAgainText}>
              JUGAR OTRA VEZ
            </Animated.Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

function StarIcon({ filled, index }: { filled: boolean; index: number }) {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, {
      damping: 10,
      stiffness: 100,
      mass: 0.5,
    });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          animationName: {
            '0%': { opacity: 0, transform: [{ scale: 0 }, { rotate: '-180deg' }] },
            '100%': { opacity: 1, transform: [{ scale: 1 }, { rotate: '0deg' }] },
          },
          animationDuration: '600ms',
          animationDelay: `${800 + index * 150}ms`,
          animationFillMode: 'backwards',
        },
      ]}
    >
      <Animated.Text style={[styles.star, !filled && styles.starEmpty]}>
        {filled ? '⭐' : '☆'}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TriviaColors.bgLight,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: TriviaColors.primary,
    marginBottom: 40,
    textAlign: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  score: {
    fontSize: 96,
    fontWeight: '900',
    color: TriviaColors.success,
    lineHeight: 96,
  },
  total: {
    fontSize: 48,
    fontWeight: '700',
    color: TriviaColors.textSecondary,
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 20,
    color: TriviaColors.textSecondary,
    marginBottom: 40,
    fontWeight: '600',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 60,
  },
  star: {
    fontSize: 56,
  },
  starEmpty: {
    opacity: 0.3,
  },
  playAgainButton: {
    backgroundColor: TriviaColors.primary,
    paddingHorizontal: 48,
    paddingVertical: 20,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  playAgainButtonPressed: {
    transform: [{ scale: 0.95 }],
  },
  playAgainText: {
    fontSize: 20,
    fontWeight: '900',
    color: TriviaColors.textLight,
    letterSpacing: 1,
  },
});

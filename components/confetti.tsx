import { StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from 'react-native-reanimated';
import { useEffect } from 'react';

interface ConfettiPiece {
  id: number;
  color: string;
  startX: number;
  delay: number;
}

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

export function Confetti({ active }: { active: boolean }) {
  const pieces: ConfettiPiece[] = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    startX: Math.random() * 100,
    delay: Math.random() * 500,
  }));

  if (!active) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {pieces.map((piece) => (
        <ConfettiPiece key={piece.id} {...piece} />
      ))}
    </View>
  );
}

function ConfettiPiece({ color, startX, delay }: Omit<ConfettiPiece, 'id'>) {
  const translateY = useSharedValue(-50);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    const randomX = (Math.random() - 0.5) * 100;
    
    translateY.value = withDelay(
      delay,
      withTiming(800, { duration: 2000, easing: Easing.out(Easing.quad) })
    );
    
    translateX.value = withDelay(
      delay,
      withTiming(randomX, { duration: 2000, easing: Easing.out(Easing.quad) })
    );
    
    rotate.value = withDelay(
      delay,
      withTiming(Math.random() * 720, { duration: 2000, easing: Easing.linear })
    );
    
    opacity.value = withDelay(
      delay + 1000,
      withTiming(0, { duration: 1000, easing: Easing.out(Easing.quad) })
    );
  }, [delay, translateY, translateX, rotate, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.piece,
        { backgroundColor: color, left: `${startX}%` },
        animatedStyle,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  piece: {
    position: 'absolute',
    width: 10,
    height: 10,
    top: 0,
  },
});

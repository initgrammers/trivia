import { StyleSheet, View, Pressable, useWindowDimensions, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import { router } from 'expo-router';
import { TriviaColors } from '@/constants/theme';
import { categories } from '@/data/questions';

const GAP = 16;
const PADDING = 20;

export default function CategoriesScreen() {
  const { width } = useWindowDimensions();
  const cardSize = (width - PADDING * 2 - GAP) / 2;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Animated.Text
        style={[
          styles.title,
          {
            animationName: {
              '0%': { opacity: 0, transform: [{ translateY: -20 }] },
              '100%': { opacity: 1, transform: [{ translateY: 0 }] },
            },
            animationDuration: '600ms',
          },
        ]}
      >
        Elige una Categoría
      </Animated.Text>

      <View style={styles.grid}>
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            index={index}
            size={cardSize}
          />
        ))}
      </View>
    </ScrollView>
  );
}

function CategoryCard({ category, index, size }: { category: typeof categories[0]; index: number; size: number }) {
  const colors: Record<string, string> = {
    ciencias: TriviaColors.ciencias,
    historia: TriviaColors.historia,
    geografia: TriviaColors.geografia,
    arte: TriviaColors.arte,
    deportes: TriviaColors.deportes,
    musica: TriviaColors.musica,
  };

  return (
    <Animated.View
      style={[
        {
          animationName: {
            '0%': { opacity: 0, transform: [{ scale: 0.8 }, { translateY: 20 }] },
            '100%': { opacity: 1, transform: [{ scale: 1 }, { translateY: 0 }] },
          },
          animationDuration: '500ms',
          animationDelay: `${index * 100}ms`,
          animationFillMode: 'backwards',
        },
      ]}
    >
      <Pressable
        onPress={() => router.push({
          pathname: '/question',
          params: { category: category.id }
        })}
        style={({ pressed }) => [
          styles.card,
          { backgroundColor: colors[category.id], width: size, height: size },
          pressed && styles.cardPressed,
        ]}
      >
        <Animated.View
          style={{
            animationName: {
              '0%, 100%': { transform: [{ translateY: 0 }] },
              '50%': { transform: [{ translateY: -8 }] },
            },
            animationDuration: '3000ms',
            animationDelay: `${index * 200}ms`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
          }}
        >
          <Animated.Text style={styles.emoji}>{category.emoji}</Animated.Text>
          <Animated.Text style={styles.categoryName}>{category.name}</Animated.Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TriviaColors.bgLight,
  },
  contentContainer: {
    paddingTop: 60,
    paddingHorizontal: PADDING,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: TriviaColors.textPrimary,
    marginBottom: 30,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  card: {
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  cardPressed: {
    transform: [{ scale: 0.95 }],
  },
  emoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700',
    color: TriviaColors.textLight,
    textAlign: 'center',
  },
});

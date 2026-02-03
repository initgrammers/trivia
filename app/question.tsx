import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import { router, useLocalSearchParams } from 'expo-router';
import { TriviaColors } from '@/constants/theme';
import { getRandomQuestions, type Category } from '@/data/questions';
import { Confetti } from '@/components/confetti';


const TIMER_SIZE = 120;

export default function QuestionScreen() {
  const params = useLocalSearchParams<{ category: Category }>();
  const category = params.category || 'ciencias';
  
  const [questions] = useState(() => getRandomQuestions(category, 10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (answered) return;
    
    const moveToNext = () => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setTimeLeft(30);
        setAnswered(false);
        setSelectedAnswer(null);
      } else {
        router.replace({
          pathname: '/results',
          params: { score: score.toString(), total: questions.length.toString() }
        });
      }
    };
    
    const handleTimeout = () => {
      setAnswered(true);
      if (timerRef.current) clearInterval(timerRef.current);
      
      setTimeout(() => {
        moveToNext();
      }, 1500);
    };
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [answered, currentIndex, questions.length, score]);

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;
    
    setAnswered(true);
    setSelectedAnswer(answerIndex);
    if (timerRef.current) clearInterval(timerRef.current);
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
    
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setTimeLeft(30);
        setAnswered(false);
        setSelectedAnswer(null);
      } else {
        router.replace({
          pathname: '/results',
          params: { score: score.toString(), total: questions.length.toString() }
        });
      }
    }, 1500);
  };

  const timerColor = timeLeft > 20 ? TriviaColors.success : timeLeft > 10 ? TriviaColors.warning : TriviaColors.error;

  return (
    <View style={styles.container}>
      <Confetti active={showConfetti} />
      
      <View style={styles.header}>
        <Animated.Text style={styles.progress}>
          Pregunta {currentIndex + 1} de {questions.length}
        </Animated.Text>
        
        <View style={[styles.timer, { borderColor: timerColor }]}>
          <Animated.Text style={[styles.timerText, { color: timerColor }]}>
            {timeLeft}
          </Animated.Text>
        </View>
      </View>

      <Animated.View
        style={[
          styles.questionContainer,
          {
            animationName: {
              '0%': { opacity: 0, transform: [{ scale: 0.9 }] },
              '100%': { opacity: 1, transform: [{ scale: 1 }] },
            },
            animationDuration: '400ms',
          },
        ]}
      >
        <Animated.Text style={styles.question}>
          {currentQuestion.question}
        </Animated.Text>
      </Animated.View>

      <View style={styles.answersContainer}>
        {currentQuestion.answers.map((answer, index) => (
          <AnswerButton
            key={`${currentQuestion.id}-${index}`}
            answer={answer}
            index={index}
            onPress={() => handleAnswer(index)}
            isCorrect={index === currentQuestion.correctAnswer}
            isSelected={selectedAnswer === index}
            answered={answered}
          />
        ))}
      </View>
    </View>
  );
}

function AnswerButton({
  answer,
  index,
  onPress,
  isCorrect,
  isSelected,
  answered,
}: {
  answer: string;
  index: number;
  onPress: () => void;
  isCorrect: boolean;
  isSelected: boolean;
  answered: boolean;
}) {
  const shakeX = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (answered && isSelected && !isCorrect) {
      shakeX.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
    
    if (answered && isCorrect) {
      scale.value = withSequence(
        withTiming(1.05, { duration: 150 }),
        withTiming(1, { duration: 150 })
      );
    }
  }, [answered, isSelected, isCorrect, shakeX, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }, { scale: scale.value }],
  }));

  const getBackgroundColor = () => {
    if (!answered) return TriviaColors.cardLight;
    if (isCorrect) return TriviaColors.success;
    if (isSelected && !isCorrect) return TriviaColors.error;
    return TriviaColors.cardLight;
  };

  const colors = [TriviaColors.primary, TriviaColors.secondary, TriviaColors.warning, TriviaColors.arte];

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          animationName: {
            '0%': { opacity: 0, transform: [{ translateX: -20 }] },
            '100%': { opacity: 1, transform: [{ translateX: 0 }] },
          },
          animationDuration: '400ms',
          animationDelay: `${index * 100}ms`,
          animationFillMode: 'backwards',
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        disabled={answered}
        style={({ pressed }) => [
          styles.answerButton,
          { 
            backgroundColor: getBackgroundColor(),
            borderColor: answered ? 'transparent' : colors[index],
          },
          pressed && !answered && styles.answerButtonPressed,
        ]}
      >
        <Animated.Text
          style={[
            styles.answerText,
            { color: answered && (isCorrect || isSelected) ? TriviaColors.textLight : TriviaColors.textPrimary }
          ]}
        >
          {answer}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TriviaColors.bgLight,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  progress: {
    fontSize: 18,
    fontWeight: '700',
    color: TriviaColors.textSecondary,
  },
  timer: {
    width: TIMER_SIZE,
    height: TIMER_SIZE,
    borderRadius: TIMER_SIZE / 2,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: TriviaColors.cardLight,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  timerText: {
    fontSize: 42,
    fontWeight: '900',
  },
  questionContainer: {
    backgroundColor: TriviaColors.cardLight,
    borderRadius: 24,
    padding: 30,
    marginBottom: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  question: {
    fontSize: 24,
    fontWeight: '700',
    color: TriviaColors.textPrimary,
    textAlign: 'center',
    lineHeight: 32,
  },
  answersContainer: {
    gap: 16,
  },
  answerButton: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 3,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  answerButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  answerText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

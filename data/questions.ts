export type Category = 'ciencias' | 'historia' | 'geografia' | 'arte' | 'deportes' | 'musica';

export interface Question {
  id: string;
  category: Category;
  question: string;
  answers: string[];
  correctAnswer: number;
}

export const categories: { id: Category; name: string; emoji: string }[] = [
  { id: 'ciencias', name: 'Ciencias', emoji: '🔬' },
  { id: 'historia', name: 'Historia', emoji: '📜' },
  { id: 'geografia', name: 'Geografía', emoji: '🌍' },
  { id: 'arte', name: 'Arte', emoji: '🎨' },
  { id: 'deportes', name: 'Deportes', emoji: '⚽' },
  { id: 'musica', name: 'Música', emoji: '🎵' },
];

export const questions: Question[] = [
  {
    id: 'c1',
    category: 'ciencias',
    question: '¿Cuál es el planeta más grande del sistema solar?',
    answers: ['Marte', 'Júpiter', 'Saturno', 'Neptuno'],
    correctAnswer: 1,
  },
  {
    id: 'c2',
    category: 'ciencias',
    question: '¿Qué gas respiran las plantas?',
    answers: ['Oxígeno', 'Nitrógeno', 'Dióxido de carbono', 'Hidrógeno'],
    correctAnswer: 2,
  },
  {
    id: 'c3',
    category: 'ciencias',
    question: '¿Cuántos huesos tiene el cuerpo humano adulto?',
    answers: ['186', '206', '226', '246'],
    correctAnswer: 1,
  },
  {
    id: 'h1',
    category: 'historia',
    question: '¿En qué año llegó Cristóbal Colón a América?',
    answers: ['1492', '1500', '1482', '1510'],
    correctAnswer: 0,
  },
  {
    id: 'h2',
    category: 'historia',
    question: '¿Quién fue el primer presidente de Estados Unidos?',
    answers: ['Abraham Lincoln', 'Thomas Jefferson', 'George Washington', 'John Adams'],
    correctAnswer: 2,
  },
  {
    id: 'h3',
    category: 'historia',
    question: '¿En qué año cayó el Muro de Berlín?',
    answers: ['1987', '1989', '1991', '1985'],
    correctAnswer: 1,
  },
  {
    id: 'g1',
    category: 'geografia',
    question: '¿Cuál es la capital de Francia?',
    answers: ['Londres', 'Berlín', 'París', 'Madrid'],
    correctAnswer: 2,
  },
  {
    id: 'g2',
    category: 'geografia',
    question: '¿Cuál es el río más largo del mundo?',
    answers: ['Nilo', 'Amazonas', 'Yangtsé', 'Misisipi'],
    correctAnswer: 1,
  },
  {
    id: 'g3',
    category: 'geografia',
    question: '¿En qué continente está Egipto?',
    answers: ['Asia', 'Europa', 'África', 'América'],
    correctAnswer: 2,
  },
  {
    id: 'a1',
    category: 'arte',
    question: '¿Quién pintó la Mona Lisa?',
    answers: ['Pablo Picasso', 'Leonardo da Vinci', 'Vincent van Gogh', 'Miguel Ángel'],
    correctAnswer: 1,
  },
  {
    id: 'a2',
    category: 'arte',
    question: '¿En qué ciudad está el museo del Louvre?',
    answers: ['Roma', 'Londres', 'París', 'Madrid'],
    correctAnswer: 2,
  },
  {
    id: 'a3',
    category: 'arte',
    question: '¿Quién esculpió el David?',
    answers: ['Donatello', 'Miguel Ángel', 'Bernini', 'Rodin'],
    correctAnswer: 1,
  },
  {
    id: 'd1',
    category: 'deportes',
    question: '¿Cuántos jugadores hay en un equipo de fútbol?',
    answers: ['9', '10', '11', '12'],
    correctAnswer: 2,
  },
  {
    id: 'd2',
    category: 'deportes',
    question: '¿En qué deporte se usa una raqueta?',
    answers: ['Fútbol', 'Baloncesto', 'Tenis', 'Natación'],
    correctAnswer: 2,
  },
  {
    id: 'd3',
    category: 'deportes',
    question: '¿Cada cuántos años se celebran los Juegos Olímpicos?',
    answers: ['2 años', '3 años', '4 años', '5 años'],
    correctAnswer: 2,
  },
  {
    id: 'm1',
    category: 'musica',
    question: '¿Cuántas cuerdas tiene una guitarra estándar?',
    answers: ['4', '5', '6', '7'],
    correctAnswer: 2,
  },
  {
    id: 'm2',
    category: 'musica',
    question: '¿Quién fue conocido como el Rey del Rock?',
    answers: ['Michael Jackson', 'Elvis Presley', 'The Beatles', 'Queen'],
    correctAnswer: 1,
  },
  {
    id: 'm3',
    category: 'musica',
    question: '¿Qué instrumento tiene teclas blancas y negras?',
    answers: ['Guitarra', 'Batería', 'Piano', 'Violín'],
    correctAnswer: 2,
  },
];

export function getQuestionsByCategory(category: Category): Question[] {
  return questions.filter((q) => q.category === category);
}

export function getRandomQuestions(category: Category, count: number = 10): Question[] {
  const categoryQuestions = getQuestionsByCategory(category);
  const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

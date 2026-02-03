# Trivia App 🧠

¡Bienvenido a Trivia! Una aplicación interactiva desarrollada con [Expo](https://expo.dev) y React Native para poner a prueba tus conocimientos en diversas áreas.

## 🚀 Características

- **Múltiples Categorías**: Desafía tu mente en Ciencias 🔬, Historia 📜, Geografía 🌍, Arte 🎨, Deportes ⚽ y Música 🎵.
- **Animaciones Fluidas**: Experiencia de usuario dinámica con `react-native-reanimated`.
- **Navegación Moderna**: Utiliza `expo-router` para una navegación fluida entre pantallas.
- **Diseño Responsivo**: Adaptado para funcionar en dispositivos móviles (Android/iOS) y web.

## 🛠️ Tecnologías Utilizadas

- **Core**: [React Native](https://reactnative.dev/), [Expo](https://expo.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Navegación**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Animaciones**: [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Iconos**: [Expo Symbols](https://docs.expo.dev/versions/latest/sdk/symbols/), [Expo Vector Icons](https://icons.expo.fyi/)

## 📦 Instalación y Uso

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clonar o descargar el proyecto**

2. **Instalar dependencias**

   Asegúrate de tener Node.js instalado.

   ```bash
   npm install
   ```

3. **Iniciar la aplicación**

   ```bash
   npx expo start
   ```

   O utiliza los scripts definidos en `package.json`:
   - `npm run android` para Android
   - `npm run ios` para iOS
   - `npm run web` para Web

4. **Visualizar**
   - Escanea el código QR con la app **Expo Go** en tu dispositivo físico.
   - O presiona `a` (Android), `i` (iOS), o `w` (Web) en la terminal para abrir en un emulador/navegador.

## 📂 Estructura del Proyecto

- **`/app`**: Contiene las pantallas y la lógica de navegación (File-based routing).
- **`/components`**: Componentes reutilizables de la interfaz de usuario.
- **`/data`**: Datos estáticos como las preguntas y categorías (`questions.ts`).
- **`/constants`**: Constantes globales como temas y colores.
- **`/hooks`**: Custom hooks para lógica compartida.

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si tienes ideas para nuevas preguntas o mejoras, siéntete libre de abrir un issue o enviar un pull request.

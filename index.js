import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

// Função para carregar fontes personalizadas
async function loadFonts() {
  await Font.loadAsync({
    'LeagueSpartan': require('./assets/fonts/LeagueSpartan-VariableFont_wght.ttf'),
    'LeagueSpartan-Bold': require('./assets/fonts/LeagueSpartan-Bold.ttf'),
    'DidactGothic': require('./assets/fonts/DidactGothic-Regular.ttf'),
    'OpenSans': require('./assets/fonts/OpenSans-VariableFont_wdth,wght.ttf'),
  });
}

// Função principal do app
export function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadAllResources() {
      await loadFonts();
      setFontsLoaded(true);
    }
    loadAllResources();
  }, []);

  // Se as fontes ainda não foram carregadas, exibe uma tela de carregamento simples
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
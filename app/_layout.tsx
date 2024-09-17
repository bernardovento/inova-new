import '~/global.css'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider, DrawerActions  } from '@react-navigation/native';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, Image, View, Text, TouchableOpacity } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { createDrawerNavigator } from '@react-navigation/drawer'; // Importa o Drawer Navigator
import HomeScreen from '~/app/HomeScreen';
import { Ionicons } from '@expo/vector-icons';


const Drawer = createDrawerNavigator(); // Cria uma instância do Drawer Navigator

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Drawer.Navigator
  screenOptions={({ navigation }) => ({
    headerTitle: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={require('~/assets/images/logo-SmartParking.png')}
          style={{ width: 130, height: 130, marginRight: 0 }}
          resizeMode="contain"
        />
        <Text style={{ fontFamily: 'LeagueSpartan', fontSize: 24, fontWeight: 'bold', color: 'white' }}>
          SMART <Text style={{ color: 'red' }}>P</Text>ARKING
        </Text>
      </View>
    ),
    headerLeft: () => null, // Remove o ícone padrão do Drawer no lado esquerdo
    headerRight: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ThemeToggle />
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          style={{ marginRight: 10 }}
        >
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>
    ),
    headerStyle: {
      backgroundColor: '#0A2E44', // Mantém o azul-escuro do fundo
    },
    drawerPosition: 'right', // Define o drawer para a direita
  })}
>

          <Drawer.Screen name="HomeScreen" component={HomeScreen} />
          {/* Adicione outras telas aqui no Drawer se necessário */}
        </Drawer.Navigator>
      <PortalHost />
    </ThemeProvider>
  );
}

import '~/global.css'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider, DrawerActions } from '@react-navigation/native';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, Image, View, Text, TouchableOpacity } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import HomeScreen from '~/app/HomeScreen';
import InfoScreen from '~/app/InfoScreen';
import ContactScreen from '~/app/ContactScreen';
import FeedBackScreen from '~/app/FeedBackScreen';
import LoginScreen from '~/app/LoginScreen';
import EnterFeedBackScreen from '~/app/EnterFeedBackScreen';
import ParkingScreen from '~/app/ParkingScreen';

import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

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
            <View style={styles.headerContainer}>
              <Image
                source={require('~/assets/images/logo-SmartParking.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.leagueSpartanBold}>
                SMART <Text style={styles.highlight}>P</Text>ARKING
              </Text>
            </View>
          ),
          headerLeft: () => null,
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <ThemeToggle />
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                style={styles.menuButton}
              >
                <Ionicons name="menu" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: styles.headerStyle,
          drawerPosition: 'right',
          drawerType: 'back',
        })}
      >
        <Drawer.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ 
            drawerLabel: 'Início', 
            title: 'Início',
            headerTitleStyle: styles.headerTitleStyle,    
          }}
        />
        <Drawer.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ 
            drawerLabel: 'Login | Cadastrar', 
            title: 'Login | Cadastrar',
            headerTitleStyle: styles.headerTitleStyle, 
          }}
        />
        <Drawer.Screen 
          name="EnterFeedBackScreen" 
          component={EnterFeedBackScreen} 
          options={{ 
            drawerLabel: 'Deixe seu FeedBack', 
            title: 'Deixe seu FeedBack',
            headerTitleStyle: styles.headerTitleStyle, 
          }}
        />
        <Drawer.Screen 
          name="ParkingScreen" 
          component={ParkingScreen} 
          options={{ 
            drawerLabel: 'Estacione seu carro!', 
            title: 'Estacione seu carro!',
            headerTitleStyle: styles.headerTitleStyle, 
          }}
        />
        <Drawer.Screen 
          name="InfoScreen" 
          component={InfoScreen} 
          options={{ 
            drawerLabel: 'Respostas Rápidas', 
            title: 'Respostas Rápidas',
            headerTitleStyle: styles.headerTitleStyle, 
          }}
        />
        <Drawer.Screen 
          name="FeedBackScreen" 
          component={FeedBackScreen} 
          options={{ 
            drawerLabel: 'Feedback dos Usuários', 
            title: 'Feedback dos Usuários',
            headerTitleStyle: styles.headerTitleStyle, 
          }}
        />
        <Drawer.Screen 
          name="ContactScreen" 
          component={ContactScreen} 
          options={{ 
            drawerLabel: 'Contato', 
            title: 'Contato',
            headerTitleStyle: styles.headerTitleStyle, 
          }}
        />
      </Drawer.Navigator>
      <PortalHost />
    </ThemeProvider>
  );
}

const styles = {
  leagueSpartanBold: {
    fontFamily: 'LeagueSpartan-Bold', // Nome da fonte carregada
    fontWeight: '700', // Opcional: muitas vezes não é necessário quando usa variantes específicas
    fontStyle: 'normal', // Estilo da fonte
    color:'#ffffff',
    fontSize:18
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100, // Ajuste do tamanho da logo
    height: 100,
    marginLeft: -10,
  },
  headerTitle: {
    fontFamily: 'Inter', // Fonte moderna
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  highlight: {
    color: '#ff3131', // Destaque em vermelho moderno
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 10,
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fundo sutil
    // Removido 'transition' pois não é suportado
  },
  headerStyle: {
    backgroundColor: '#0A2E44', // Azul escuro moderno
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Sombras suaves
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderBottomLeftRadius: 12, // Bordas arredondadas
    borderBottomRightRadius: 12,
  },
  headerTitleStyle: {
    fontFamily: 'LeagueSpartan-Bold', // Fonte clean e moderna
  },
  drawerStyle: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24, // Bordas arredondadas no Drawer
    borderBottomLeftRadius: 24,
  },
};

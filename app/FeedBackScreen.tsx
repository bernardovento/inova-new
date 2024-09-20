import React, { useState } from 'react';
import { View, Text, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { useTheme } from '@react-navigation/native';
import { MoveLeft } from '~/lib/icons/MoveLeft';  // Importação do ícone MoveLeft
import { MoveRight } from '~/lib/icons/MoveRight';  // Importação do ícone MoveRight
import { Button } from '~/components/ui/button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './_layout'; // Importa o tipo de rotas que você definiu


const { width } = Dimensions.get('window');

// Constante com os feedbacks
const feedbacks = [
  {
    userName: 'João Silva',
    date: '2024-09-20',
    comment: 'Ótima experiência com o aplicativo! Muito prático e fácil de usar.'
  },
  {
    userName: 'Maria Oliveira',
    date: '2024-09-18',
    comment: 'Consegui reservar minha vaga em poucos minutos. Recomendo!'
  },
  {
    userName: 'Carlos Souza',
    date: '2024-09-15',
    comment: 'O aplicativo facilitou muito a minha rotina, muito prático!'
  },
  {
    userName: 'Ana Costa',
    date: '2024-09-10',
    comment: 'Adorei o suporte ao cliente, rápido e eficiente!'
  }
];

export default function FeedbackScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'EnterFeedBackScreen'>>();
  const isDesktopOrTablet = width >= 768;

  const [currentFeedback, setCurrentFeedback] = useState(0); // Estado para armazenar o índice atual do feedback
  const { colors } = useTheme();

  const handlePrevious = () => {
    setCurrentFeedback((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1)); // Volta para o feedback anterior
  };

  const handleNext = () => {
    setCurrentFeedback((prev) => (prev === feedbacks.length - 1 ? 0 : prev + 1)); // Avança para o próximo feedback
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Card className='w-full max-w-sm' style={{ backgroundColor: colors.card, padding: 16 }}>
          <CardHeader>
            <CardTitle>{feedbacks[currentFeedback].userName}</CardTitle>
          </CardHeader>
          <CardContent className='gap-4 native:gap-2'>
            <Text style={{ color: colors.text }}>{feedbacks[currentFeedback].comment}</Text>
          </CardContent>
          <CardFooter>
            <Text style={{ color: colors.text }}>{feedbacks[currentFeedback].date}</Text>
          </CardFooter>
        </Card>

        {/* Ícones de navegação */}
        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
          <TouchableOpacity onPress={handlePrevious} style={{ padding: 10 , paddingRight:250}}>
            <MoveLeft color='#ced5dd' size={40} strokeWidth={1.5} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext} style={{ padding: 10 }}>
            <MoveRight color='#ced5dd' size={40} strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>
      <Button 
        onPress={() => navigation.navigate('EnterFeedBackScreen')}
        style={{
          alignSelf: 'center', // Centraliza o botão horizontalmente
          width: isDesktopOrTablet ? '30%' : '100%',        // Define a largura como 60% da largura da tela
          marginTop: 20        // Espaçamento superior opcional
        }}
      >
        Deixe o seu feedback!
      </Button> 
    </SafeAreaView>
  );
}

import { useTheme } from '@react-navigation/native';
import { View, Dimensions, Alert } from 'react-native';
import * as React from 'react';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Text } from '~/components/ui/text';

const { width } = Dimensions.get('window');

export default function EnterFeedbackScreen() {
  const [name, setName] = React.useState('');
  const [feedback, setFeedback] = React.useState('');
  const [loading, setLoading] = React.useState(false); // Estado de carregamento
  const { colors } = useTheme(); // Obtém as cores do tema

  // Função para enviar o feedback para a API
  const handleSubmit = async () => {
    if (!feedback) {
      Alert.alert('Erro', 'O campo de feedback não pode estar vazio.');
      return;
    }

    setLoading(true); // Ativa o estado de carregamento
    try {
      const response = await fetch('https://smartparking-api-render.onrender.com/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name || 'Anônimo', // Se o nome estiver vazio, enviamos "Anônimo"
          content: feedback,
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Seu feedback foi enviado com sucesso!');
        setName(''); // Limpa o campo de nome
        setFeedback(''); // Limpa o campo de feedback
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao enviar seu feedback. Tente novamente mais tarde.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar o feedback. Verifique sua conexão.');
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 6, backgroundColor: colors.background }}>
      <Card style={{ backgroundColor: colors.card, borderColor: colors.border }}>
        <CardHeader>
          <CardTitle style={{ color: colors.text }}>Feedback</CardTitle>
          <CardDescription style={{ color: colors.text }}>
            Deixe seu feedback para nos ajudar a melhorar, ele pode aparecer na aba Comentários!
          </CardDescription>
        </CardHeader>
        <CardContent className='gap-4 native:gap-2'>
          <View className='gap-1'>
            <Label nativeID='feedback' style={{ color: colors.text }}>
              Deixe seu nome (Opcional)
            </Label>
            <Input
              id='name'
              value={name}
              onChangeText={setName}
              placeholder="Escreva seu nome aqui"
              multiline={false}
              style={{ backgroundColor: colors.card, color: colors.text }}
            />
          </View>
          <View className='gap-1'>
            <Label nativeID='feedback' style={{ color: colors.text }}>
              Deixe seu comentário
            </Label>
            <Input
              id='feedback'
              value={feedback}
              onChangeText={setFeedback}
              placeholder="Escreva seu feedback aqui"
              multiline={true}
              style={{ backgroundColor: colors.card, color: colors.text, height: 300 }}
            />
          </View>
        </CardContent>
        <CardFooter>
          <Button
            style={{ backgroundColor: colors.primary }}
            onPress={handleSubmit}
            disabled={loading} // Desativa o botão enquanto carrega
          >
            <Text style={{ color: colors.textInverse }}>
              {loading ? 'Enviando...' : 'Enviar'}
            </Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}

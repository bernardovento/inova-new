import { useTheme } from '@react-navigation/native';
import { View, Dimensions } from 'react-native';
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
  const { colors } = useTheme(); // Obtém as cores do tema

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
              id='feedback'
              value={name}
              onChangeText={setName}
              placeholder="Escreva seu nome aqui"
              multiline={false} // Make the input multiline for longer feedback
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
              multiline={true} // Make the input multiline for longer feedback
              style={{ backgroundColor: colors.card, color: colors.text , height: 300 }}
            />
          </View>
        </CardContent>
        <CardFooter>
          <Button style={{ backgroundColor: colors.primary }}>
            <Text style={{ color: colors.textInverse }}>Enviar</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
}
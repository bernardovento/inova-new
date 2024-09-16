import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text>Essa tela não existe!</Text>

        <Link href='/'>
          <Text>Ir para a tela inicial!</Text>
        </Link>
      </View>
    </>
  );
}

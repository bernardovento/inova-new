import * as React from 'react';
import { View, Image } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, LayoutAnimationConfig } from 'react-native-reanimated';
import { Info } from '~/lib/icons/Info';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

const GITHUB_AVATAR_URI =
  'https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg';

export default function Screen() {
  const [progress, setProgress] = React.useState(78);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }
  return (
    <View className="flex-1 justify-start items-center gap-5 p-6 bg-secondary/30">
      <Text style={{ color: '#ced5dd', fontSize: 64, fontFamily: 'LeagueSpartan', marginTop: 70 }}>Sua Vaga</Text>
  
      <View className="flex-row items-center gap-2">
        <Text style={{ color: '#ced5dd', fontSize: 64, fontFamily: 'DidactGothic' }}>a um</Text>
        <Image 
          source={require('~/assets/images/icone_carro.png')} 
          style={{ width: 100, height: 100 }} // Ajuste o tamanho conforme necessário
        />
      </View>
      <Text style={{ color: '#ced5dd', fontSize: 64, fontFamily: 'DidactGothic' }}>clique!</Text>
  
      <Text style={{ color: '#ced5dd', fontSize: 20, fontFamily: 'DidactGothic', textAlign: 'center', marginTop: 60 }}>
        Encontre e reserve seu estacionamento de forma rápida, segura e conveniente para você.
      </Text>
    </View>
  );
}

import * as React from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Image, Dimensions} from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { Info } from '~/lib/icons/Info';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { MoveRight } from '~/lib/icons/MoveRight';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Text } from '~/components/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

const { width } = Dimensions.get('window');

const GITHUB_AVATAR_URI =
  'https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg';

export default function Screen() {

  const isDesktopOrTablet = width >= 768;

  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, flexDirection: isDesktopOrTablet ? 'row' : 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: isDesktopOrTablet ? 140 : 0}}>
      {/* Seção de textos */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: isDesktopOrTablet ? 'flex-start' : 'center', gap: 5 }}>
        <Text style={{ color: colors.text, fontSize: 64, fontFamily: 'DidactGothic', marginTop: 70, padding: 10 }}>Sua Vaga</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Text style={{ color: colors.text, fontSize: 64, fontFamily: 'DidactGothic', padding: 10 }}>a um</Text>
          <Image
            source={require('~/assets/images/icone_carro.png')}
            style={{ width: 100, height: 100 }} // Ajuste o tamanho conforme necessário
          />
        </View>

        <Text style={{ color: colors.text, fontSize: 64, fontFamily: 'DidactGothic', padding: 10 }}>clique!</Text>

        <Text style={{ color: colors.text, fontSize: 20, fontFamily: 'DidactGothic', textAlign: 'center', marginTop: 60 }}>
          Encontre e reserve seu estacionamento de forma rápida, segura e conveniente para você.
        </Text>

        <Button
          style={{
            backgroundColor: '#ff3131',
            borderRadius: 30,
            padding: 25,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, marginRight: 10, fontFamily: 'OpenSans' }}>FAÇA A SUA RESERVA</Text>
          <MoveRight color='#ced5dd' size={40} strokeWidth={1.5} />
        </Button>
      </View>

      {/* Seção da imagem */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: isDesktopOrTablet ? 0 : 20, // Adiciona margem em telas pequenas
        }}
      >
        <Image
          source={require('~/assets/images/image-car.png')}
          style={{
            width: isDesktopOrTablet ? 500 : 300,
            height: isDesktopOrTablet ? 500 : 300
          }} // Ajuste o tamanho conforme necessário
        />
      </View>
    </View>
  );
}
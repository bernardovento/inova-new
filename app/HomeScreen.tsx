import * as React from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Image, Dimensions} from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { MoveRight } from '~/lib/icons/MoveRight';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const isDesktopOrTablet = width >= 768;
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: isDesktopOrTablet ? 'row' : 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: isDesktopOrTablet ? 40 : 20, // Ajuste de padding para se alinhar com o Drawer
      }}
    >
      {/* Seção de textos */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: isDesktopOrTablet ? 'flex-start' : 'center',
          gap: 5,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: isDesktopOrTablet ? 48 : 32, // Ajuste de tamanho de fonte para diferentes dispositivos
            fontFamily: 'DidactGothic',
            marginTop: 40,
            padding: 10,
          }}
        >
          Sua Vaga
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Text
            style={{
              color: colors.text,
              fontSize: isDesktopOrTablet ? 48 : 32,
              fontFamily: 'DidactGothic',
              padding: 10,
            }}
          >
            a um
          </Text>
          <Image
            source={require('~/assets/images/icone_carro.png')}
            style={{ width: isDesktopOrTablet ? 80 : 50, height: isDesktopOrTablet ? 80 : 50 }}
            resizeMode="contain"
          />
        </View>

        <Text
          style={{
            color: colors.text,
            fontSize: isDesktopOrTablet ? 48 : 32,
            fontFamily: 'DidactGothic',
            padding: 10,
          }}
        >
          clique!
        </Text>

        <Text
          style={{
            color: colors.text,
            fontSize: 20,
            fontFamily: 'DidactGothic',
            textAlign: 'center',
            marginTop: 40, // Redução do espaçamento em dispositivos menores
            paddingHorizontal: isDesktopOrTablet ? 0 : 20, // Adiciona padding horizontal em dispositivos menores
          }}
        >
          Encontre e reserve seu estacionamento de forma rápida, segura e conveniente para você.
        </Text>

        <Button
          style={{
            backgroundColor: '#ff3131',
            borderRadius: 30,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, marginRight: 10, fontFamily: 'OpenSans' }}>
            FAÇA A SUA RESERVA
          </Text>
          <MoveRight color='#ced5dd' size={40} strokeWidth={1.5} />
        </Button>
      </View>

      {/* Seção da imagem */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: isDesktopOrTablet ? 0 : 20, // Adiciona margem em telas menores
        }}
      >
        <Image
          source={require('~/assets/images/image-car.png')}
          style={{
            width: isDesktopOrTablet ? 400 : 250, // Ajusta o tamanho da imagem com base no dispositivo
            height: isDesktopOrTablet ? 400 : 250,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
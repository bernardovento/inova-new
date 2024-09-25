import * as React from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Image, Dimensions, SafeAreaView  } from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { MoveRight } from '~/lib/icons/MoveRight';
import { RootStackParamList } from './_layout';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'ParkingScreen'>>();
  const isDesktopOrTablet = width >= 1200;
  const { colors } = useTheme();

  return (
    <SafeAreaView 
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
          alignItems: isDesktopOrTablet ? 'flex-start' : 'center', // Alinha à esquerda no desktop e centraliza em dispositivos menores
          gap: 5,
          paddingRight: isDesktopOrTablet ? 40 : 0, // Adiciona padding direito para alinhar com o botão
          paddingLeft: isDesktopOrTablet ? 20 : 0, // Padding à esquerda para alinhamento
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: isDesktopOrTablet ? 96 : 40, // Ajuste de tamanho de fonte para diferentes dispositivos
            fontFamily: 'DidactGothic',
            marginTop: isDesktopOrTablet ? -60 : 40,
            padding: isDesktopOrTablet ? 40 : 4,
          }}
        >
          Sua Vaga
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Text
            style={{
              color: colors.text,
              fontSize: isDesktopOrTablet ? 96 : 40,
              fontFamily: 'DidactGothic',
              padding: isDesktopOrTablet ? 40 : 4,
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
            fontSize: isDesktopOrTablet ? 96 : 40,
            fontFamily: 'DidactGothic',
            padding: isDesktopOrTablet ? 40 : 4,
          }}
        >
          clique!
        </Text>

        <Text
          style={{
            color: colors.text,
            fontSize: isDesktopOrTablet ? 20 : 16,
            fontFamily: 'DidactGothic',
            textAlign: 'left', // Alinha o texto à esquerda
            marginTop: isDesktopOrTablet ? 120 : 20, // Redução do espaçamento em dispositivos menores
            paddingHorizontal: isDesktopOrTablet ? 0 : 20, // Adiciona padding horizontal em dispositivos menores
            maxWidth: isDesktopOrTablet ? 600 : '100%', // Limita a largura no PC para forçar a quebra de linha
          }}
        >
          Encontre e reserve seu estacionamento de forma rápida, segura e conveniente para você.
        </Text>

        <Button
          onPress={() => navigation.navigate('ParkingScreen')}
          style={{
            backgroundColor: '#ff3131',
            borderRadius: 30,
            padding: isDesktopOrTablet ? 25 : 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: isDesktopOrTablet ? 120 : 25,
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
            width: isDesktopOrTablet ? 1300 : 1300, // Ajusta o tamanho da imagem com base no dispositivo
            height: isDesktopOrTablet ? 1300 : 350,
            maxWidth: isDesktopOrTablet ? 1300 : 500, // Limita o tamanho máximo da imagem
            maxHeight: isDesktopOrTablet ? 1300 : 350, // Limita a altura máxima da imagem
            flexShrink: 1, // Permite que a imagem diminua em caso de conflito de espaço
          }}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}
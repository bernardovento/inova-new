// ParkingScreen.tsx
import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Text
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { NAV_THEME } from '~/lib/constants';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

import Car from '~/components/Car';

interface Theme {
  background: string;
  border: string;
  card: string;
  notification: string;
  primary: string;
  text: string;
  textInverse: string;
  shadow: string;
}

interface CarType {
  id: number;
  name: string;
  color: string;
}

interface DialogData {
  name: string;
  id: number;
}

const vagas = Array.from({ length: 30 }, (_, i) => i + 1);
const { width, height } = Dimensions.get('window');

function ParkingScreen() {
  const { dark } = useTheme();
  const isDarkMode = dark;
  const theme = isDarkMode ? NAV_THEME.dark : NAV_THEME.light;

  console.log('Tema Atual:', isDarkMode ? 'Escuro' : 'Claro');
  console.log('Cor do card atual:', theme.card);

  const styles = useStyles(theme);

  const [cars, setCars] = useState<CarType[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogData, setDialogData] = useState<DialogData>({ name: '', id: 0 });
  const [imageLayout, setImageLayout] = useState({ width: 0, height: 0 });
  const [inputName, setInputName] = useState('');
  const [selectedVaga, setSelectedVaga] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchVagas = async () => {
    try {
      const response = await fetch('https://smartparking-api-render.onrender.com/vagas');
      if (response.ok) {
        const vagasAtualizadas = await response.json();
        const vagasOcupadas = vagasAtualizadas.filter((vaga: CarType) => vaga.name);
        setCars(vagasOcupadas);
        console.log('Vagas atualizadas:', vagasOcupadas);
      } else {
        console.error('Erro ao buscar vagas:', response.status);
      }
    } catch (error) {
      console.error('Erro na requisição de vagas:', error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      await fetchVagas();
      setIsLoading(false);
    };

    initialize();

    const interval = setInterval(fetchVagas, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleVagaClick = (vagaId: number) => {
    const vagaOcupada = cars.find((car) => car.id === vagaId);
    
    console.log(`Vaga clicada: ${vagaId}, Ocupada: ${!!vagaOcupada}`);

    if (vagaOcupada) {
      setDialogData({ name: vagaOcupada.name, id: vagaOcupada.id });
      setSelectedVaga(null);
    } else {
      setSelectedVaga(vagaId);
    }
    setDialogVisible(true);
  };

  const handleSaveVaga = async () => {
    if (!inputName.trim()) {
      Alert.alert('Erro', 'Por favor, insira um nome.');
      return;
    }

    try {
      const response = await fetch(
        `https://smartparking-api-render.onrender.com/vaga/${selectedVaga}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: inputName }),
        }
      );

      if (response.ok) {
        const vaga = await response.json();
        // Remover geração de cor aleatória do cliente
        // A cor deve ser gerada e armazenada no servidor para consistência

        await fetchVagas();

        setDialogVisible(false);
        setInputName('');
        setSelectedVaga(null);
        Alert.alert('Sucesso', 'Vaga reservada com sucesso!');
        console.log('Vaga reservada com sucesso:', vaga);
      } else {
        Alert.alert('Erro', 'Falha ao reservar a vaga.');
        console.error('Erro ao reservar a vaga:', response.status);
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao reservar a vaga.');
      console.error('Erro na requisição:', error);
    }
  };

  const renderVagas = useMemo(() => {
    if (!imageLayout.width) return null;

    return vagas.map((vagaId) => {
      const vagaWidth = imageLayout.width * 0.187;
      const vagaHeight = imageLayout.height * 0.0565;

      const column = (vagaId - 1) % 2;
      const row = Math.floor((vagaId - 1) / 2);

      const centerX = imageLayout.width / 2;
      const centerY = imageLayout.height / 2;

      const margin = imageLayout.width * 0.337;
      const leftOffset = imageLayout.width * 0.26;
      const topOffset = imageLayout.height * 0.395;

      const leftPosition =
        centerX + (column - 0.5) * vagaWidth + margin * column - leftOffset;
      const topPosition = centerY + (row - 0.5) * vagaHeight - topOffset;

      const vagaOcupada = cars.find((car) => car.id === vagaId);

      console.log(`Vaga ${vagaId} ocupada:`, vagaOcupada);

      const deveRotacionar = vagaId % 2 === 0;

      return (
        <View key={vagaId} style={{ position: 'absolute', top: topPosition, left: leftPosition }}>
          <TouchableOpacity
            style={[
              styles.vaga,
              {
                width: vagaWidth,
                height: vagaHeight,
              },
            ]}
            onPress={() => handleVagaClick(vagaId)}
            accessible={true}
            accessibilityLabel={`Vaga ${vagaId} ${vagaOcupada ? 'carro de ' + vagaOcupada.name : 'disponível'}`}
          >
            <View style={styles.vagaContent} />
          </TouchableOpacity>
          {vagaOcupada && (
            <Car
              pointerEvents="none" // Agora válido após a modificação
              color={vagaOcupada.color}
              style={[
                styles.car,
                {
                  width: vagaWidth,
                  height: vagaHeight,
                  transform: deveRotacionar ? [{ rotate: '180deg' }] : [],
                },
              ]}
            />
          )}
        </View>
      );
    });
  }, [vagas, cars, imageLayout, styles.car, styles.vaga, handleVagaClick]);

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Estacione seu carro!</Text>
          <Text style={styles.subtitle}>
            Nosso sistema utiliza critérios rigorosos para garantir a segurança e eficiência. Pedimos desculpas por qualquer inconveniente causado.
          </Text>
          <View
            style={styles.imageContainer}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              setImageLayout({ width, height });
              console.log('Layout da imagem atualizado:', { width, height });
            }}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color={theme.primary} />
            ) : (
              <>
                <Image
                  source={require('~/assets/images/estacionamento.png')}
                  style={styles.estacionamento}
                />
                {renderVagas}
              </>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Diálogo para reservar ou visualizar informações da vaga */}
      <Dialog open={dialogVisible} onOpenChange={setDialogVisible}>
        <DialogContent className="sm:max-w-[425px] bg-blue-100'" style={styles.dialogContent}>
          <DialogHeader>
            <DialogTitle>
              <Text style={styles.dialogTitle}>
                {selectedVaga && !cars.find((car) => car.id === selectedVaga)
                  ? 'Reserva de Vaga'
                  : 'Informações da Vaga'}
              </Text>
            </DialogTitle>
            <DialogDescription>
              <Text style={styles.dialogDescription}>
                {selectedVaga && !cars.find((car) => car.id === selectedVaga)
                  ? 'Insira seu nome para reservar a vaga.'
                  : `Carro de ${dialogData.name}`}
              </Text>
            </DialogDescription>
          </DialogHeader>

          {selectedVaga && !cars.find((car) => car.id === selectedVaga) ? (
            <>
              <TextInput
                value={inputName}
                onChangeText={setInputName}
                style={styles.input}
                placeholder="Seu nome"
                placeholderTextColor={theme.text}
                accessible={true}
                accessibilityLabel="Campo para inserir o nome"
              />
              <DialogFooter>
                <Button onPress={handleSaveVaga} style={styles.button}>
                  <Text style={styles.buttonText}>Reservar</Text>
                </Button>
              </DialogFooter>
            </>
          ) : (
            <DialogFooter>
              <DialogClose asChild>
                <Button style={styles.button} onPress={() => setDialogVisible(false)}>
                  <Text style={styles.buttonText}>OK</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

const useStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      color: theme.text,
      marginTop:36
    },
    subtitle: {
      fontSize: 10, // Tamanho de fonte menor para o subtítulo
      textAlign: 'center',
      color: theme.text, // Use uma cor secundária se disponível
      marginBottom: 8, // Espaçamento abaixo do subtítulo
      
    },
    imageContainer: {
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: theme.background,
    },
    estacionamento: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    vaga: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 5,
    },
    vagaContent: {
      flex: 1,
    },
    car: {
      position: 'absolute',
      top: 0,
      left: 0,
    },
    input: {
      height: 40,
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      color: theme.text,
      borderColor: theme.border,
      backgroundColor: theme.card,
      borderRadius: 5,
    },
    button: {
      marginTop: 10,
      backgroundColor: theme.primary, // Utiliza a cor do tema
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.textInverse,
    },
    dialogContent: {
      padding: 20,
      borderRadius: 10,
      backgroundColor: theme.card,
      // Adicione sombra ou outras propriedades conforme necessário
    },
    dialogTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
    },
    dialogDescription: {
      fontSize: 16,
      marginBottom: 20,
      color: theme.text,
    },
  });

export default ParkingScreen;
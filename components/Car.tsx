// ~/components/Car.tsx
import React from 'react';
import { View, Image, StyleSheet, StyleProp, ViewStyle, ViewProps } from 'react-native';

interface CarProps extends ViewProps { // Estende ViewProps para incluir todas as propriedades de View
  color: string; // Cor do carro
  style?: StyleProp<ViewStyle>; // Estilo opcional para posicionamento
}

const Car: React.FC<CarProps> = ({ color, style, ...rest }) => { // Adiciona ...rest para capturar outras props
  return (
    <View style={[styles.car, style]} {...rest}> {/* Espalha as props restantes no View */}
      <Image
        source={require('~/assets/images/car.png')}
        style={[styles.image, { tintColor: color }]}
      />
      <Image
        source={require('~/assets/images/car_extra.png')}
        style={styles.extraImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  car: {
    // O estilo será passado via props para posicionamento
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  extraImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    // Se necessário, ajuste as propriedades de posicionamento
    // top: 0,
    // left: 0,
  },
});

export default Car;
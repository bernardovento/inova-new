import * as React from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Image, Dimensions} from 'react-native';
import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { MoveRight } from '~/lib/icons/MoveRight';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';

const { width } = Dimensions.get('window');

export default function ContactScreen() {
  const isDesktopOrTablet = width >= 768;
  const { colors } = useTheme();

  return (
    <View style={{ paddingTop: 20, paddingLeft: 15 }}>
      <Text>Essa é a tela que demonstrará as forams de contato e local para dar feedbacks!</Text>
  </View>
  );
}
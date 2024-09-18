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

export default function InfoScreen() {
  const isDesktopOrTablet = width >= 768;
  const { colors } = useTheme();

  return (
    <View style={{ 
      flex: isDesktopOrTablet ? 0.5 : 1, 
      justifyContent: 'center', 
      alignItems: 'center'
    }}>
      <Accordion
        type='multiple'
        collapsible
        className='w-full max-w-sm native:max-w-md'
      >
      <AccordionItem value='item-1'>
        <AccordionTrigger>
          <Text>Quem nós somos?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>Nós somos um grupo de estudantes de Ciência da Computação da Universidade Vila Velha.</Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>
          <Text>What are universal components?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>
            In the world of React Native, universal components are components that work on both
            web and native platforms.
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </View>
  );
}
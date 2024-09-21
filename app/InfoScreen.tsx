import * as React from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Dimensions, ScrollView, SafeAreaView, StyleSheet  } from 'react-native';
import { Text } from '~/components/ui/text';
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
    <ScrollView style={styles.container}>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <Accordion
          type='multiple'
          collapsible
          className='w-full max-w-sm native:max-w-md'
        >
          <AccordionItem value='item-1'>
            <AccordionTrigger>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Quem nós somos?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text style={{ fontSize: 16 }}>
                Somos um grupo de estudantes de Ciência da Computação da Universidade Vila Velha, focados em criar soluções tecnológicas inovadoras.
              </Text>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-2'>
            <AccordionTrigger>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Como o aplicativo funcionará?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text style={{ fontSize: 16 }}>
                O aplicativo conectará motoristas a estacionamentos disponíveis, permitindo a reserva de vagas online, facilitando o dia a dia.
              </Text>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-3'>
            <AccordionTrigger>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Quais plataformas serão suportadas?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text style={{ fontSize: 16 }}>
                O aplicativo estará disponível para web, além de dispositivos móveis com sistemas iOS e Android.
              </Text>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-4'>
            <AccordionTrigger>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Quais serão as vantagens de usar o aplicativo?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text style={{ fontSize: 16 }}>
                Os usuários economizarão tempo, evitarão filas e garantirão uma vaga antes de chegar ao destino, com informações em tempo real sobre disponibilidade.
              </Text>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-5'>
            <AccordionTrigger>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Como será possível alterar ou cancelar uma reserva?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text style={{ fontSize: 16 }}>
                Os usuários poderão modificar ou cancelar reservas diretamente no aplicativo.
              </Text>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-6'>
            <AccordionTrigger>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>O aplicativo oferecerá suporte em tempo real?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text style={{ fontSize: 16 }}>
                Sim, o suporte ao cliente estará disponível 24 horas por dia, 7 dias por semana, via chat ou e-mail.
              </Text>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-7'>
            <AccordionTrigger>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Como estacionamentos poderão se cadastrar no aplicativo?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text style={{ fontSize: 16 }}>
                Proprietários de estacionamentos poderão se cadastrar na nossa plataforma entrando em contato conosco.
              </Text>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-8'>
            <AccordionTrigger>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>O aplicativo terá funcionalidades de acessibilidade?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text style={{ fontSize: 16 }}>
                Sim, o aplicativo oferecerá opções de acessibilidade, como visualização de vagas para deficientes e suporte a comandos de voz.
              </Text>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-9'>
            <AccordionTrigger>
              <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Haverá algum custo adicional pelo uso do aplicativo?</Text>
            </AccordionTrigger>
            <AccordionContent>
              <Text style={{ fontSize: 16 }}>
                Não haverá custos adicionais para os motoristas.
              </Text>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  }
});
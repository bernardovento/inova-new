import * as React from 'react';
import { useTheme } from '@react-navigation/native';
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Text } from '~/components/ui/text';
import { Card } from '~/components/ui/card';

const { width } = Dimensions.get('window');

export default function ContactScreen() {
  const { colors } = useTheme();

  const teamMembers = [
    {
      name: 'Bernardo Rauta Ramos',
      email: 'bernardovento@hotmail.com',
      phone: '+55 27 99606-2408',
      description: 'Bernardo, com 24 anos, é o líder do grupo e o principal arquiteto do projeto. Ele foi o responsável pelo design e desenvolvimento completo do aplicativo web, da API e do banco de dados, garantindo que todas as funcionalidades estivessem integradas de forma eficiente e intuitiva.',
    },
    {
      name: 'Rafael Barbosa Crema',
      email: 'rafael.crema333@gmail.com',
      phone: '+55 27 99910-3905',
      description: 'Com 22 anos, Rafael desempenhou um papel fundamental no desenvolvimento do projeto. Além de criar um modelo 3D experimental durante a fase de prototipagem, ele foi o responsável por estruturar o banco de dados da API, assegurando que os dados fossem gerenciados de maneira eficiente e segura.',
    },
    {
      name: 'João Paulo Muniz Larroca',
      email: 'joaopmlarocca@gmail.com',
      phone: '+55 27 99242-6508',
      description: 'João Paulo trouxe insights valiosos para a concepção do projeto, contribuindo para a clareza da apresentação final.',
    },
    {
      name: 'Guilherme Souza Oliveira',
      email: 'gui.souza2003oliveir@gmail.com',
      phone: '+55 27 99724-3699',
      description: 'Guilherme ofereceu suporte criativo ao grupo, ajudando na comunicação eficaz da proposta durante a apresentação.',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {teamMembers.map((member, index) => (
        <Card key={index} style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
          <Text style={[styles.name, { color: colors.text }]}>{member.name}</Text>
          <Text style={{ color: colors.text }}>Email: {member.email}</Text>
          <Text style={{ color: colors.text }}>Phone: {member.phone}</Text>
          <Text style={[styles.description, { color: colors.text }]}>
            {member.description}
          </Text>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 4, // Sombra para Android
    shadowOffset: { width: 0, height: 2 }, // Sombra para iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    marginTop: 8,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});

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
      description: 'Bernardo é o desenvolvedor líder e responsável por todo o projeto. Ele projetou e implementou tanto o aplicativo web quanto a API e o banco de dados.',
    },
    {
      name: 'Rafael',
      email: 'rafael@example.com',
      phone: '+55 11 88888-8888',
      description: 'Rafael é o especialista em backend, garantindo a integração e a performance dos serviços.',
    },
    {
      name: 'João Paulo Muniz Larroca',
      email: 'gui.souza2003oliveir@gmail.com',
      phone: '+55 27 99242-6508',
      description: 'João cuida do design UI/UX, trazendo a melhor experiência visual para o aplicativo.',
    },
    {
      name: 'Guilherme Souza Oliveira',
      email: 'guilherme@example.com',
      phone: '+55 27 99724-3699',
      description: 'Experiente em trabalhar comPower BI, Excel e SQL. Conhece as linguagens C, C#, Python, Java JavaScript.',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {teamMembers.map((member, index) => (
        <Card key={index} style={styles.card}>
          <Text style={styles.name}>{member.name}</Text>
          <Text>Email: {member.email}</Text>
          <Text>Phone: {member.phone}</Text>
          <Text style={styles.description}>{member.description}</Text>
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
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#555',
  },
});

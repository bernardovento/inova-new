import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, SafeAreaView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { useTheme } from '@react-navigation/native';
import { MoveLeft } from '~/lib/icons/MoveLeft';
import { MoveRight } from '~/lib/icons/MoveRight';
import { Button } from '~/components/ui/button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './_layout';
import { useColorScheme } from '~/lib/useColorScheme';

const { width } = Dimensions.get('window');

// Definindo o tipo de feedback para que o TypeScript reconheça corretamente os dados
interface Feedback {
  name: string;
  content: string;
}

export default function FeedbackScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'EnterFeedBackScreen'>>();
  const isDesktopOrTablet = width >= 768;
  const { colors } = useTheme();

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [currentFeedback, setCurrentFeedback] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('https://smartparking-api-render.onrender.com/feedbacks');
        const data = await response.json();
        const filteredFeedbacks = data.map((feedback: any) => ({
          name: feedback.name,
          content: feedback.content,
        }));
        setFeedbacks(filteredFeedbacks);
      } catch (error) {
        setError('Erro ao buscar feedbacks. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handlePrevious = () => {
    setCurrentFeedback((prev) => (prev === 0 ? feedbacks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentFeedback((prev) => (prev === feedbacks.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.contentContainer}>
        {feedbacks.length > 0 ? (
          <>
            <Card style={[styles.card, { backgroundColor: colors.card }]}>
              <CardHeader>
                <CardTitle style={[styles.cardTitle, { color: colors.text }]}>{feedbacks[currentFeedback].name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Text style={[styles.cardContentText, { color: colors.text }]}>{feedbacks[currentFeedback].content}</Text>
              </CardContent>
            </Card>

            <View style={styles.navigationContainer}>
              <TouchableOpacity onPress={handlePrevious} style={styles.navButton}>
                <MoveLeft color={isDarkColorScheme ? '#ced5dd' : '#081428'} size={40} strokeWidth={1.5} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleNext} style={styles.navButton}>
                <MoveRight color={isDarkColorScheme ? '#ced5dd' : '#081428'} size={40} strokeWidth={1.5} />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={[styles.noFeedbackText, { color: colors.text }]}>Nenhum feedback disponível.</Text>
        )}
      </View>

      <Button 
        onPress={() => navigation.navigate('EnterFeedBackScreen')}
        style={[
          styles.feedbackButton,
          {
            width: isDesktopOrTablet ? '30%' : '90%',
            backgroundColor: colors.primary,
          }
        ]}
      >
        <Text style={{ color: colors.textInverse }}>Deixe o seu feedback!</Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 16,
    borderRadius: 16,
    elevation: 4, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContentText: {
    fontSize: 16,
    lineHeight: 24,
  },
  navigationContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  navButton: {
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  feedbackButton: {
    alignSelf: 'center',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  noFeedbackText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

import { useTheme } from '@react-navigation/native';
import { View, Dimensions } from 'react-native';
import * as React from 'react';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Text } from '~/components/ui/text';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [value, setValue] = React.useState('account');
  const isDesktopOrTablet = width >= 768;
  const { colors } = useTheme(); // Obtém as cores do tema

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 6, backgroundColor: colors.background }}>
      <Tabs
        value={value}
        onValueChange={setValue}
        className='w-full max-w-[400px] mx-auto flex-col gap-1.5'
      >
        <TabsList className='flex-row w-full bg-transparent'>
          <TabsTrigger value='account' className='flex-1' style={{
            backgroundColor: value === 'account' ? colors.primary : colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 5,
          }}>
            <Text style={{ color: value === 'account' ? colors.textInverse : colors.text }}>Login</Text>
          </TabsTrigger>
          <TabsTrigger value='register' className='flex-1' style={{
            backgroundColor: value === 'register' ? colors.primary : colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 5,
          }}>
            <Text style={{ color: value === 'register' ? colors.textInverse : colors.text }}>Cadastro</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          <Card style={{ backgroundColor: colors.card, borderColor: colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: colors.text }}>Login</CardTitle>
            </CardHeader>
            <CardContent className='gap-4 native:gap-2'>
              <View className='gap-1'>
                <Label nativeID='email' style={{ color: colors.text }}>Email</Label>
                <Input
                  id='email'
                  placeholder="you@company.com"
                  style={{ backgroundColor: colors.card, color: colors.text }}
                />
              </View>
              <View className='gap-1'>
                <Label nativeID='password' style={{ color: colors.text }}>Senha</Label>
                <Input
                  id='password'
                  placeholder="Senha"
                  secureTextEntry={true}
                  style={{ backgroundColor: colors.card, color: colors.text }}
                />
              </View>
            </CardContent>
            <CardFooter>
              <Button style={{ backgroundColor: colors.primary }}>
                <Text style={{ color: colors.textInverse }}>Login</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='register'>
          <Card style={{ backgroundColor: colors.card, borderColor: colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: colors.text }}>Cadastro</CardTitle>
              <CardDescription style={{ color: colors.text }}>
                Crie uma conta preenchendo os campos abaixo.
              </CardDescription>
            </CardHeader>
            <CardContent className='gap-4 native:gap-2'>
              <View className='gap-1'>
                <Label nativeID='name' style={{ color: colors.text }}>Nome Completo</Label>
                <Input
                  id='name'
                  placeholder='Seu nome completo'
                  style={{ backgroundColor: colors.card, color: colors.text }}
                />
              </View>
              <View className='gap-1'>
                <Label nativeID='email' style={{ color: colors.text }}>Email</Label>
                <Input
                  id='email'
                  placeholder='you@company.com'
                  style={{ backgroundColor: colors.card, color: colors.text }}
                />
              </View>
              <View className='gap-1'>
                <Label nativeID='password' style={{ color: colors.text }}>Senha</Label>
                <Input
                  id='password'
                  placeholder='Senha'
                  secureTextEntry={true}
                  style={{ backgroundColor: colors.card, color: colors.text }}
                />
              </View>
              <View className='gap-1'>
                <Label nativeID='confirmPassword' style={{ color: colors.text }}>Confirmar Senha</Label>
                <Input
                  id='confirmPassword'
                  placeholder='Confirmar Senha'
                  secureTextEntry={true}
                  style={{ backgroundColor: colors.card, color: colors.text }}
                />
              </View>
            </CardContent>
            <CardFooter>
              <Button style={{ backgroundColor: colors.primary }}>
                <Text style={{ color: colors.textInverse  }}>Cadastrar</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
}

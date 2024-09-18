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
  const { colors } = useTheme();

  return (
    <View className='flex-1 justify-center p-6'>
      <Tabs
        value={value}
        onValueChange={setValue}
        className='w-full max-w-[400px] mx-auto flex-col gap-1.5'
      >
        <TabsList className='flex-row w-full'>
          <TabsTrigger value='account' className='flex-1'>
            <Text>Login</Text>
          </TabsTrigger>
          <TabsTrigger value='register' className='flex-1'>
            <Text>Cadastro</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className='gap-4 native:gap-2'>
              <View className='gap-1'>
                <Label nativeID='email'>Email</Label>
                <Input id='email' placeholder="you@company.com" />
              </View>
              <View className='gap-1'>
                <Label nativeID='password'>Senha</Label>
                <Input id='password' placeholder="Senha" secureTextEntry={true} />
              </View>
            </CardContent>
            <CardFooter>
              <Button>
                <Text>Login</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='register'>
          <Card>
            <CardHeader>
              <CardTitle>Cadastro</CardTitle>
              <CardDescription>
                Crie uma conta preenchendo os campos abaixo.
              </CardDescription>
            </CardHeader>
            <CardContent className='gap-4 native:gap-2'>
              <View className='gap-1'>
                <Label nativeID='name'>Nome Completo</Label>
                <Input id='name' placeholder='Seu nome completo' />
              </View>
              <View className='gap-1'>
                <Label nativeID='email'>Email</Label>
                <Input id='email' placeholder='you@company.com' />
              </View>
              <View className='gap-1'>
                <Label nativeID='password'>Senha</Label>
                <Input id='password' placeholder='Senha' secureTextEntry={true} />
              </View>
              <View className='gap-1'>
                <Label nativeID='confirmPassword'>Confirmar Senha</Label>
                <Input id='confirmPassword' placeholder='Confirmar Senha' secureTextEntry={true} />
              </View>
            </CardContent>
            <CardFooter>
              <Button>
                <Text>Cadastrar</Text>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
}

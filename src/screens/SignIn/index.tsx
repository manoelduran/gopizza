import { Input } from '@components/Input';
import { Button } from '@components/Button';
import brandImg from '@assets/brand.png';
import { KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import {
    Container,
    Content,
    Title,
    Brand,
    ForgotPasswordButton,
    ForgotPasswordLabel
} from './styles';
import { useAuth } from '@hooks/auth';
export function SignIn() {
    const { signIn, isLoading, forgetPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function handleSignIn() {
        signIn(email, password);
    }
    function handleForgotPassword() {
        forgetPassword(email)
    }
    return (
        <Container>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
                <Content>
                    <Brand source={brandImg} />
                    <Title>Login</Title>
                    <Input
                        placeholder="E-mail"
                        onChangeText={setEmail}
                        type="secundary"
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                    <Input
                        placeholder="Senha"
                        onChangeText={setPassword}
                        type="secundary"
                        secureTextEntry
                    />
                    <ForgotPasswordButton onPress={handleForgotPassword}>
                        <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
                    </ForgotPasswordButton>
                    <Button title='Conectar' type='primary' onPress={handleSignIn} isLoading={isLoading} />
                </Content>
            </KeyboardAvoidingView>
        </Container>
    );
}
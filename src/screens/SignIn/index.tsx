import { Input } from '@components/Input';
import { Button } from '@components/Button';
import brandImg from '@assets/brand.png';
import { KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import {
    Container,
    Content,
    Title,
    Brand,
    ForgotPasswordButton,
    ForgotPasswordLabel
} from './styles';
export function SignIn() {
    return (
        <Container>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
                <Content>
                    <Brand source={brandImg} />
                    <Title>Login</Title>
                    <Input
                        placeholder="E-mail"
                        type="secundary"
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                    <Input
                        placeholder="Senha"
                        type="secundary"
                        secureTextEntry
                    />
                    <ForgotPasswordButton>
                        <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
                    </ForgotPasswordButton>
                    <Button title='Conectar' type='primary' />
                </Content>
            </KeyboardAvoidingView>
        </Container>
    );
}
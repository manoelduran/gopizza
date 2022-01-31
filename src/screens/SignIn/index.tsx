import { Input } from '@components/Input';
import React from 'react';
import {
    Container
} from './styles';
export function SignIn() {
    return (
        <Container>
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
        </Container>
    );
}
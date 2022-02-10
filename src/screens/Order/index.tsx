import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { Platform, ScrollView } from 'react-native';
import { PIZZA_TYPES } from '@utils/pizzaTypes';
import { BackButton } from '@components/BackButton';
import { RadioButton } from '@components/RadioButton';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import {
    Container,
    Header,
    Photo,
    Sizes,
    Form,
    FormRow,
    InputGroup,
    Label,
    Price,
    Title,
    Scroll
} from './styles';




export function Order() {
    const [size, setSize] = useState('');
    const theme = useTheme();
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}  >
            <Scroll>
                <Header>
                    <BackButton
                        onPress={() => { }}
                        style={{ marginBottom: 108 }}
                    />
                </Header>
                <Photo source={{ uri: 'https://github.com/manoelduran.png' }} />

                <Form>
                    <Title> Nome da Pizza </Title>
                    <Label>Selecione um tamanho</Label>
                    <Sizes>
                        {
                            PIZZA_TYPES.map(item => (
                                <RadioButton
                                    key={item.id}
                                    title={item.name}
                                    selected={size === item.id}
                                    onPress={() => setSize(item.id)}
                                />
                            ))
                        }
                    </Sizes>
                    <FormRow>
                        <InputGroup>
                            <Label>Número da mesa</Label>
                            <Input
                                keyboardType='numeric'
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label>Quantidade</Label>
                            <Input
                                keyboardType='numeric'
                            />
                        </InputGroup>
                    </FormRow>
                    <Price>Total: R$ 10</Price>
                    <Button
                        title='Confirmar o pedido'
                    />
                </Form>
            </Scroll>
        </Container>
    );
}
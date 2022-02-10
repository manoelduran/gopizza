import React, { useState } from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { BackButton } from '@components/BackButton';
import { RadioButton } from '@components/RadioButton';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { PIZZA_TYPES } from '@utils/pizzaTypes';
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
    const navigation = useNavigation();
    function handleGoBack() {
        navigation.goBack();
    };
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}  >
            <Scroll>
                <Header>
                    <BackButton
                        onPress={handleGoBack}
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
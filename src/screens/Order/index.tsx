import React, { useState, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from 'styled-components/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackButton } from '@components/BackButton';
import { RadioButton } from '@components/RadioButton';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ProductProps } from '@components/ProductCard';
import { PIZZA_TYPES } from '@utils/pizzaTypes';
import { OrderNavigationProps } from '@src/@types/navigation';
import { useAuth } from '@hooks/auth';
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



interface PizzaProps extends ProductProps {
    prices_sizes: {
        [key: string]: number;
    }
}

export function Order() {
    const { user } = useAuth();
    const route = useRoute();
    const { id } = route.params as OrderNavigationProps;
    const [size, setSize] = useState('');
    const [pizza, setPizza] = useState<PizzaProps>({} as PizzaProps);
    const [quantity, setQuantity] = useState(0);
    const [tabel, setTabel] = useState('');
    const [sendingOrder, setSendingOrder] = useState(false);
    const theme = useTheme();
    const amount = size ? pizza.prices_sizes[size] * quantity : '0,00';
    const navigation = useNavigation();
    function handleGoBack() {
        navigation.goBack();
    };
    function handleOrder() {
        if (!size) {
            return Alert.alert('Pedido', 'Selecione o tamanho da pizza');
        }
        if (!tabel) {
            return Alert.alert('Pedido', 'Selecione a mesa');
        };
        if (!quantity) {
            return Alert.alert('Pedido', 'Selecione a quantidade');
        };
        setSendingOrder(true);
        firestore()
            .collection('orders')
            .add({
                quantity,
                amount,
                pizza: pizza.name,
                size,
                tabel_number: tabel,
                status: 'Preparando',
                waiter_id: user?.id,
                image: pizza.photoUrl
            })
            .then(() => navigation.navigate('Home'))
            .catch(() => {
                Alert.alert('Pedido', 'Não foi possivel realizar o pedido');
                setSendingOrder(false);
            });
    };
    useEffect(() => {
        if (id) {
            firestore()
                .collection('pizzas')
                .doc(id)
                .get()
                .then(response => setPizza(response.data() as PizzaProps))
                .catch(() => Alert.alert('Pedido', 'Não foi possivel carregar o produto'));
        };
    }, [id]);
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}  >
            <Scroll>
                <Header>
                    <BackButton
                        onPress={handleGoBack}
                        style={{ marginBottom: 108 }}
                    />
                </Header>
                <Photo source={{ uri: pizza.photoUrl }} />

                <Form>
                    <Title> {pizza.name} </Title>
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
                                onChangeText={setTabel}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Label>Quantidade</Label>
                            <Input
                                keyboardType='numeric'
                                onChangeText={(value) => setQuantity(Number(value))}
                            />
                        </InputGroup>
                    </FormRow>
                    <Price>Total: R$ {amount}</Price>
                    <Button
                        title='Confirmar o pedido'
                        onPress={handleOrder}
                        isLoading={sendingOrder}
                    />
                </Form>
            </Scroll>
        </Container>
    );
}
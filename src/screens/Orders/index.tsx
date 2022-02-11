import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from 'styled-components/native';
import { OrderCard, OrderProps } from '@components/OrderCard';
import { ItemSeparator } from '@components/ItemSeparator';
import {
    Container,
    Header,
    HeaderTitle
} from './styles';
import { useAuth } from '@hooks/auth';



export function Orders() {
    const theme = useTheme();
    const { user } = useAuth();
    const [orders, setOrders] = useState<OrderProps[]>([]);
    function handlePizzaDelivery(id: string){
            Alert.alert('Pedido', 'Confirmar que a pizza foi entregue?', [
                {
                    text: 'Não',
                    style: 'cancel'
                },
                {
                    text: 'Sim',
                    onPress: () => firestore().collection('orders').doc(id).update({
                        status: 'Entregue'
                    })
                }
            ])
    }
    useEffect(() => {
        const subscribe = firestore()
            .collection('orders')
            .where('waiter_id', '==', user?.id)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                }) as OrderProps[];
                setOrders(data);
            });
        return () => subscribe();
    }, [])
    return (
        <Container>
            <Header>
                <HeaderTitle>Pedidos feitos</HeaderTitle>
            </Header>
            <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <OrderCard
                        data={item}
                        index={index}
                        disabled={item.status === 'Entregue'}
                        onPress={() => handlePizzaDelivery(item.id)}
                    />
                )}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 125 }}
                ItemSeparatorComponent={() => <ItemSeparator />}
            />
        </Container>
    );
}
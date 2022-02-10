import React from 'react';
import { FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { OrderCard } from '@components/OrderCard';
import { ItemSeparator } from '@components/ItemSeparator';
import {
    Container,
    Header,
    HeaderTitle
} from './styles';



export function Orders() {
    const theme = useTheme();
    return (
        <Container>
            <Header>
                <HeaderTitle>Pedidos feitos</HeaderTitle>
            </Header>
            <FlatList
                data={['1', '2', '3']}
                keyExtractor={item => item}
                renderItem={({ item, index }) => (
                    <OrderCard
                        index={index}
                    />
                )}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 24 , paddingBottom: 125 }}
                ItemSeparatorComponent={() => <ItemSeparator />}
            />
        </Container>
    );
}
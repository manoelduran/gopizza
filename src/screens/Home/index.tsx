import React, { useState, useCallback } from 'react';
import { Alert, FlatList } from 'react-native';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import happyEmoji from '@assets/happy.png';
import { useAuth } from '@hooks/auth';
import { Search } from '@components/Search';
import { ListHeader } from '@components/ListHeader';
import { ProductCard, ProductProps } from '@components/ProductCard';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
    Container,
    Header,
    Greeting,
    GreetingEmoji,
    GreetingText,
    LogOut,
    MenuHeader,
    MenuItemsNumber,
    Title,
    NewProductButton
} from './styles';


export function Home() {
    const { signOut } = useAuth();
    const navigation = useNavigation();
    const theme = useTheme();
    const [pizzas, setPizzas] = useState<ProductProps[]>([]);
    const [search, setSearch] = useState('');
    function getPizzas(value: string) {
        const formattedValue = value.toLowerCase().trim();
        firestore()
            .collection('pizzas')
            .orderBy('name_insensitive')
            .startAt(formattedValue)
            .endAt(`${formattedValue}\uf8ff`)
            .get()
            .then(response => {
                const data = response.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    };
                }) as ProductProps[];
                setPizzas(data);
            })
            .catch(() => Alert.alert('Consulta', 'Não foi possivel realizar a consulta'))
    };
    function handleSearchPizza() {
        getPizzas(search);
    };
    function handleClearPizza() {
        setSearch('');
        getPizzas('');
    };
    function handleAdd() {
        navigation.navigate('Product', {});
    };
    function handlePizza(id: string) {
        navigation.navigate('Product', {
            id
        });
    };
    useFocusEffect(
        useCallback(() => {
            getPizzas(search);
        }, []));
    return (
        <Container>
            <Header>
                <Greeting>
                    <GreetingEmoji source={happyEmoji} />
                    <GreetingText>Olá, Admin</GreetingText>
                </Greeting>
                <LogOut onPress={signOut} >
                    <MaterialIcons
                        name='logout'
                        color={theme.COLORS.TITLE}
                        size={24}
                    />
                </LogOut>
            </Header>
            <Search
                value={search}
                onChangeText={setSearch}
                onSearch={handleSearchPizza}
                onClear={handleClearPizza}
            />
            <MenuHeader>
                <Title>Cardápio</Title>
                <ListHeader />
                <MenuItemsNumber> {pizzas.length} pizzas </MenuItemsNumber>
            </MenuHeader>
            <FlatList
                data={pizzas}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <ProductCard
                        data={item}
                        onPress={() => handlePizza(item.id)}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 20,
                    paddingBottom: 125,
                    marginHorizontal: 24
                }}
            />
            <NewProductButton
                title='Cadastrar Pizza'
                type='primary'
                onPress={handleAdd}
            />
        </Container>
    );
}
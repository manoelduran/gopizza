import React from 'react';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import happyEmoji from '@assets/happy.png';
import { useAuth } from '@hooks/auth';
import { Search } from '@components/Search';
import { ListHeader } from '@components/ListHeader';
import {
    Container,
    Header,
    Greeting,
    GreetingEmoji,
    GreetingText,
    LogOut,
    MenuHeader,
    MenuItemsNumber,
    Title
} from './styles';


export function Home() {
    const { signOut } = useAuth();
    const theme = useTheme();
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
                onSearch={() => { }} onClear={() => { }}
            />
            <MenuHeader>
                <Title>Cardápio</Title>
                <ListHeader />
                <MenuItemsNumber>321</MenuItemsNumber>
            </MenuHeader>
        </Container>
    );
}
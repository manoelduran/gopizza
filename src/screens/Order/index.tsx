import React from 'react';
import { useTheme } from 'styled-components/native';
import { Platform } from 'react-native';
import { BackButton } from '@components/BackButton';
import {
    Container,
    Header,
    Photo,
    Sizes
} from './styles';
import { RadioButton } from '@components/RadioButton';

export function Order() {
    const theme = useTheme();
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}  >
            <Header>
                <BackButton
                    onPress={() => { }}
                    style={{ marginBottom: 108 }}
                />
            </Header>
            <Photo source={{ uri: 'https://github.com/manoelduran.png' }} />
            <Sizes>
                <RadioButton
                title='ola'
                selected={false}
                />
            </Sizes>
        </Container>
    );
}
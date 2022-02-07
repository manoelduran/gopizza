import React from 'react';
import { TextInputProps } from 'react-native';
import {
    Container,
    Size,
    Label,
    PriceInput
} from './styles';

interface InputPriceProps extends TextInputProps {
    size: string;
}

export function InputPrice({ size, ...rest }: InputPriceProps) {
    return (
        <Container>
            <Size>
                <Label>{size} </Label>
            </Size>
            <Label>R$ </Label>
            <PriceInput
                keyboardType='numeric'
                {...rest}
            />
        </Container>
    );
}
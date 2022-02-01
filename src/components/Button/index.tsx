import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import {
    Container, TypeButtonProps, Load, Title
} from './styles';

interface ButtonProps extends RectButtonProps {
    title: string;
    type?: TypeButtonProps;
    isLoading?: boolean;
}

export function Button({ title, type = 'primary', isLoading = false, ...rest }: ButtonProps) {
    return (
        <Container type={type} enabled={!isLoading}  {...rest}>
            {isLoading ? <Load /> : <Title> {title} </Title>}
        </Container>
    );
}
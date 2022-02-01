import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import {
    Container, TypeButtonProps, Load, Title
} from './styles';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    type?: TypeButtonProps;
    isLoading?: boolean;
}

export function Button({ title, type = 'primary', isLoading = false, ...rest }: ButtonProps) {
    return (
        <Container type={type} {...rest}>
            {isLoading ? <Load /> : <Title> {title} </Title>}
        </Container>
    );
}
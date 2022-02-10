import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import {
    Container,
    Description,
    Name,
    Photo,
    StatusContainer,
    StatusLabel,
    StatusTypesProps
} from './styles';

type OrderCardProps = TouchableOpacityProps & {
    index: number;
};

export function OrderCard({ index, ...rest }: OrderCardProps) {
    return (
        <Container
            index={index}
            {...rest}
        >
            <Photo source={{ uri: 'https://github.com/manoelduran.png' }} />
            <Name>Calabresa</Name>
            <Description>
                Mesa 5  - Qnt: 1
            </Description>
            <StatusContainer status='Preparando' >
                <StatusLabel status='Preparando'  >Preparando</StatusLabel>
            </StatusContainer>
        </Container>
    );
}
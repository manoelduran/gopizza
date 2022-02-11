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

export type OrderProps = {
    id: string;
    pizza: string;
    image: string;
    status: StatusTypesProps;
    tabel_number: string;
    quantity: string;
}

export type OrderCardProps = TouchableOpacityProps & {
    index: number;
    data: OrderProps;
};

export function OrderCard({ data, index, ...rest }: OrderCardProps) {
    return (
        <Container
            index={index}
            {...rest}
        >
            <Photo source={{ uri: data.image }} />
            <Name>{data.pizza}</Name>
            <Description>
                Mesa {data.tabel_number}  - Qnt: {data.quantity}
            </Description>
            <StatusContainer status={data.status} >
                <StatusLabel status={data.status}  >{data.status}</StatusLabel>
            </StatusContainer>
        </Container>
    );
}
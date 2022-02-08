import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import {
    Container,
    Content,
    Description,
    Details,
    Identification,
    Image,
    Line,
    Name
} from './styles';


export interface ProductProps {
    id: string;
    photoUrl: string;
    name: string;
    description: string;
};

interface ProductCardProps extends TouchableOpacityProps {
    data: ProductProps;
};

export function ProductCard({ data, ...rest }: ProductCardProps) {
    const theme = useTheme();
    return (
        <Container>
            <Content {...rest} >
                <Image
                    source={{ uri: data.photoUrl }}
                />
                <Details>
                    <Identification>
                        <Name> {data.name} </Name>
                        <Feather
                            name='chevron-right'
                            size={18}
                            color={theme.COLORS.SHAPE}
                        />
                    </Identification>
                    <Description> {data.description} </Description>
                </Details>

            </Content>
            <Line />
        </Container>
    );
}
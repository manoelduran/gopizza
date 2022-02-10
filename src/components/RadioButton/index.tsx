import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import {
    Container,
    Radio,
    RadioButtonCssProps,
    Selected,
    Title
} from './styles';

type RadioButtonProps = TouchableOpacityProps & RadioButtonCssProps & {
    title: string;
};

export function RadioButton({ title, selected = false, ...rest }: RadioButtonProps) {
    return (
        <Container selected={selected} {...rest} >
            <Radio>
                {selected && <Selected />}
            </Radio>
            <Title> {title} </Title>
        </Container>
    );
}
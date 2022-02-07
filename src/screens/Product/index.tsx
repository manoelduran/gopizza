import React, { useState } from 'react';
import { BackButton } from '@components/BackButton';
import { Photo } from '@components/Photo';
import * as ImagePicker from 'expo-image-picker';
import { Platform, TouchableOpacity } from 'react-native';
import {
    Container,
    Header,
    Title,
    DeleteLabel,
    Upload,
    PickImageButton
} from './styles';

export function Product() {
    const [image, setImage] = useState('');
    async function handlePickImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4]
            });
            if (!response.cancelled) {
                setImage(response.uri);
            }
        }
    }
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
            <Header>
                <BackButton />
                <Title>Cadastrar</Title>
                <TouchableOpacity>
                    <DeleteLabel>Deletar</DeleteLabel>
                </TouchableOpacity>
            </Header>
            <Upload>
                <Photo uri={image} />
                <PickImageButton title='Carregar' type='primary' onPress={handlePickImage } />
            </Upload>
        </Container>
    );
}
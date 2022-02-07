import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Platform, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { BackButton } from '@components/BackButton';
import { Photo } from '@components/Photo';
import { Input } from '@components/Input';
import { InputPrice } from '@components/InputPrice';
import { Button } from '@components/Button';
import {
    Container,
    Header,
    Title,
    DeleteLabel,
    Upload,
    PickImageButton,
    Form,
    InputGroup,
    InputGroupHeader,
    Label,
    MaxCharacters
} from './styles';


export function Product() {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [small, setSmall] = useState('');
    const [medium, setMedium] = useState('');
    const [large, setLarge] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    async function handlePickImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === 'granted') {
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 4]
            });
            if (!response.cancelled) {
                setImage(response.uri);
            };
        };
    };
    async function handleAddPizza() {
        if (!name.trim()) {
            return Alert.alert('Cadastro', 'Informe o nome da pizza');
        };
        if (!description.trim()) {
            return Alert.alert('Cadastro', 'Informe a descrição da pizza');
        };
        if (!image) {
            return Alert.alert('Cadastro', 'Informe a imagem da pizza');
        };
        if (!small) {
            return Alert.alert('Cadastro', 'Informe o valor da pizza P');
        };
        if (!medium) {
            return Alert.alert('Cadastro', 'Informe o valor da pizza M');
        };
        if (!large) {
            return Alert.alert('Cadastro', 'Informe o valor da pizza G');
        };
        setIsLoading(true);
        const fileName = new Date().getTime();
        const reference = storage().ref(`/pizzas/${fileName}.png`);
        await reference.putFile(image);
        const photoUrl = await reference.getDownloadURL();
        firestore()
            .collection('pizzas')
            .add({
                name,
                name_insensitive: name.toLowerCase().trim(),
                description,
                prices_sizes: {
                    p: small,
                    m: medium,
                    g: large,
                },
                photoUrl,
                photo_path: reference.fullPath
            })
            .then(() => Alert.alert('Cadastro', 'Pizza cadastrada com sucesso!'))
            .catch(() => Alert.alert('Cadastro', 'Não foi possivel cadastrar a pizza'));
            setIsLoading(false);
    };
    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
            <ScrollView showsVerticalScrollIndicator={false} >
                <Header>
                    <BackButton />
                    <Title>Cadastrar</Title>
                    <TouchableOpacity>
                        <DeleteLabel>Deletar</DeleteLabel>
                    </TouchableOpacity>
                </Header>
                <Upload>
                    <Photo uri={image} />
                    <PickImageButton title='Carregar' type='primary' onPress={handlePickImage} />
                </Upload>
                <Form>
                    <InputGroup>
                        <Label>Nome</Label>
                        <Input
                            onChangeText={setName}
                            value={name}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroupHeader>
                            <Label>Descrição</Label>
                            <MaxCharacters> 0 de 60 caracteres </MaxCharacters>
                        </InputGroupHeader>
                        <Input
                            multiline
                            maxLength={60}
                            style={{ height: 80 }}
                            onChangeText={setDescription}
                            value={description}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label>Tamanhos e preços</Label>
                        <InputPrice
                            size='P'
                            onChangeText={setSmall}
                            value={small}
                        />
                        <InputPrice
                            size='M'
                            onChangeText={setMedium}
                            value={medium}
                        />
                        <InputPrice
                            size='G'
                            onChangeText={setLarge}
                            value={large}
                        />
                    </InputGroup>
                    <Button
                        title='Cadastrar pizza'
                        isLoading={isLoading}
                        onPress={handleAddPizza}
                    />
                </Form>
            </ScrollView>
        </Container>
    );
}
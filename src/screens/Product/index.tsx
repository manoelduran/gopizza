import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { ProductNavigationProps } from '@src/@types/navigation';
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
    MaxCharacters,
    AddButton
} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ProductProps } from '@components/ProductCard';


interface PizzaResponse extends ProductProps {
    photo_path: string;
    prices_sizes: {
        p: string;
        m: string;
        g: string;
    };
}

export function Product() {
    const [photoPath, setPhotoPath] = useState('');
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [small, setSmall] = useState('');
    const [medium, setMedium] = useState('');
    const [large, setLarge] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params as ProductNavigationProps;
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
            .then(() => navigation.navigate('Home'))
            .catch(() => {
                setIsLoading(false);
                Alert.alert('Cadastro', 'Não foi possivel cadastrar a pizza')
            })
 

    };
    function handleDeletePizza() {
        firestore()
            .collection('pizzas')
            .doc(id)
            .delete()
            .then(() => {
                storage()
                    .ref(photoPath)
                    .delete()
            });
        navigation.navigate('Home');
    }
    function handleGoBack() {
        navigation.goBack();
    };
    useEffect(() => {
        if (id) {
            firestore()
                .collection('pizzas')
                .doc(id)
                .get()
                .then(response => {
                    const product = response.data() as PizzaResponse;
                    setName(product.name);
                    setDescription(product.description);
                    setImage(product.photoUrl);
                    setSmall(product.prices_sizes.p);
                    setMedium(product.prices_sizes.m);
                    setLarge(product.prices_sizes.g);
                    setPhotoPath(product.photo_path);
                })
                .catch(() => Alert.alert('Pizza', 'Não foi possivel carregar os dados da pizza'))
        }
    }, [id])

    return (
        <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
            <ScrollView showsVerticalScrollIndicator={false} >
                <Header>
                    <BackButton
                        onPress={handleGoBack}
                    />
                    <Title>Cadastrar</Title>
                    {id ? < TouchableOpacity >
                        <DeleteLabel
                            onPress={handleDeletePizza}>
                            Deletar
                        </DeleteLabel>
                    </TouchableOpacity>
                        :
                        <View style={{ width: 50 }} />
                    }
                </Header>
                <Upload>
                    <Photo uri={image} />
                    {!id && <PickImageButton title='Carregar' type='primary' onPress={handlePickImage} />}
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
                            <MaxCharacters> { } de 60 caracteres </MaxCharacters>
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
                    {!id && <AddButton
                    title='Cadastrar pizza'
                    type='secundary'
                    isLoading={isLoading}
                    onPress={handleAddPizza}
                />}
                </Form>
            </ScrollView>
        </Container >
    );
}
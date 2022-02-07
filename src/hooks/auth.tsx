import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
interface AuthProviderProps {
    children: ReactNode;
};
export interface User {
    id: string;
    name: string;
    isAdmin: boolean;
}
interface AuthContextData {
    user: User | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    loadUser: () => Promise<void>;
    signOut: () => Promise<void>;
    forgetPassword: (email: string) => Promise<void>;
};
const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const { setItem, removeItem, getItem } = useAsyncStorage('@gopizza:users');
    async function signIn(email: string, password: string) {
        if (!email || !password) {
            return Alert.alert('Login', 'Informe o email e a senha');
        };
        setIsLoading(true);
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(account => {
                firestore()
                    .collection('users')
                    .doc(account.user.uid)
                    .get()
                    .then(async (profile) => {
                        const { name, isAdmin } = profile.data() as User;
                        if (profile.exists) {
                            const userData = {
                                id: account.user.uid,
                                name,
                                isAdmin
                            };
                            console.log(userData);
                            await setItem(JSON.stringify(userData))
                            setUser(userData);
                        }
                    })
                    .catch(() => Alert.alert('Login', 'Não foi possivel buscar os dados de perfil do usuário'));
            })
            .catch(error => {
                const { code } = error;
                if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
                    return Alert.alert('Login', 'E-mail e/ou senha inválidos.');
                } else {
                    return Alert.alert('Login', 'Não foi possível realizar o login');
                }
            })
            .finally(() => setIsLoading(false));
    };
    async function loadUser() {
        const userCollection = await getItem();
        if (userCollection) {
            const parsedUser = await JSON.parse(userCollection) as User;
            console.log(parsedUser);
            setUser(parsedUser);
        }
        setIsLoading(false);
    };
    async function signOut() {
        auth().signOut()
        await removeItem();
        setUser(null);
    };
    async function forgetPassword(email: string){
        if(!email){
            return Alert.alert('Redefinir senha', 'Informe o E-mail');
        };
        auth().sendPasswordResetEmail(email)
        .then(() => Alert.alert('Redefinir senha', 'Enviamos um link no seu email com o link de redefinição de senha'))
        .catch(() => Alert.alert('Redefinir senha', 'Não foi possivel enviar o email para redefinir senha'))
    };
    useEffect(() => {
        loadUser();
    }, [])
    return (
        <AuthContext.Provider value={{ user, signIn, isLoading, loadUser, signOut, forgetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);
    return context;
};
export { AuthProvider, useAuth }

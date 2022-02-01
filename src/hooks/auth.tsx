import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
interface AuthProviderProps {
    children: ReactNode;
};
interface User {
    id: string;
    name: string;
    isAdmin: boolean;
}
interface AuthContextData {
    user: User | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
};
const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false);
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
                    .then(profile => {
                        const { name, isAdmin } = profile.data() as User;
                        if (profile.exists) {
                            const userData = {
                                id: account.user.uid,
                                name,
                                isAdmin
                            };
                            console.log(userData);
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
    }
    return (
        <AuthContext.Provider value={{ user, signIn, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);
    return context;
};
export { AuthProvider, useAuth }

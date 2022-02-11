import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from 'styled-components/native';
import { Home } from '@screens/Home';
import { Orders } from '@screens/Orders';
import { BottomMenu } from '@components/BottomMenu';


const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {
    const [notifications, setNotifications] = useState('0');
    const theme = useTheme();
    useEffect(() => {
        const subscribe = firestore()
        .collection('orders')
        .where('status', '==', 'Pronto')
        .onSnapshot(querySnapShot => {
            setNotifications(String(querySnapShot.docs.length));
        });
        return () => subscribe();
    }, [])
    return (
        <Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.COLORS.SECONDARY_900,
                tabBarInactiveTintColor: theme.COLORS.SECONDARY_400,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0
                },
            }}
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <BottomMenu
                            title='Cardápio'
                            color={color}
                        />
                    )
                }}
            />
            <Screen
                name="Orders"
                component={Orders}
                options={{
                    tabBarIcon: ({ color }) => (
                        <BottomMenu
                            title='Pedidos'
                            color={color}
                            notifications={notifications}
                        />
                    )
                }}
            />
        </Navigator>
    );
}
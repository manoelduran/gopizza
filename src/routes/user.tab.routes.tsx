import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Home } from '@screens/Home';
import { Orders } from '@screens/Orders';


const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {
        const theme = useTheme();
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
            />
                   <Screen
                name="Orders"
                component={Orders}
            />
        </Navigator>
    );
}
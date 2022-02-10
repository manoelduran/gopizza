import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';
import { UserStackRoutes } from './user.stack.routes';
import { UserTabRoutes } from './user.tab.routes';

export function Routes() {
    const {user} = useAuth();
    return (
        <NavigationContainer>
             <UserTabRoutes/>
        </NavigationContainer>
    )
}
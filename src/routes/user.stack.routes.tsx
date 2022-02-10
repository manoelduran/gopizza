import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@screens/Home';
import { Product } from '@screens/Product';
import { Order } from '@screens/Order';
import { useAuth } from '@hooks/auth';
import { UserTabRoutes } from './user.tab.routes';

const { Navigator, Screen, Group } = createNativeStackNavigator();

export function UserStackRoutes() {
    const { user } = useAuth();
    return (
        <Navigator initialRouteName="Home">

            {
                user?.isAdmin ?
                    (
                        <Group>
                            <Screen
                                name="Home"
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false
                                }}
                                component={Home}
                            />
                            <Screen
                                name="Product"
                                options={{
                                    headerShown: false
                                }}
                                component={Product}
                            />
                        </Group>
                    ) : (
                        <Group>
                            <Screen
                                name="UserTabRoutes"
                                options={{
                                    headerShown: false,
                                    gestureEnabled: false
                                }}
                                component={UserTabRoutes}
                            />
                            <Screen
                                name="Order"
                                options={{
                                    headerShown: false
                                }}
                                component={Order}
                            />
                        </Group>
                    )

            }
        </Navigator>
    );
}
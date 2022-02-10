import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@screens/Home';
import { Product } from '@screens/Product';
import { Order } from '@screens/Order';

const { Navigator, Screen } = createNativeStackNavigator();

export function UserStackRoutes() {
    return (
        <Navigator initialRouteName="Home">
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
            <Screen
                name="Order"
                options={{
                    headerShown: false
                }}
                component={Order}
            />
        </Navigator>
    );
}
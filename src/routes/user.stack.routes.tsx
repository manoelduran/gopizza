import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@screens/Home';
import { Product } from '@screens/Product';

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
        </Navigator>
    );
}
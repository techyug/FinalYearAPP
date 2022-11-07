import { Button, StyleSheet, Text, View } from 'react-native'


export default function HomeScreen({ route, navigation }) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }
    });
    console.warn(navigation, route);
    return (
        <View style={styles.container}>
            <Text>Welcome {route.params.userEmail}</Text>
            <Button title='Logout' onPress={() => navigation.replace('Login')} />
        </View>
    )
}


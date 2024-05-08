import React from 'react'
import { Alert, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { Card, Text, Button } from 'react-native-paper'

const ItemDetails = ({navigation, route}) => {

    let item = route.params.item;

    const showPricePlus21 = (price) => {
        let pricePlus21 = (price + price*0.21).toString();
        Alert.alert("Precio sumando 21%", pricePlus21);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Card>
                    <Card.Content>
                        <Text variant="titleLarge">{item.name}</Text>
                        <Text variant="bodyMedium">${item.price}</Text>
                        <Text variant="bodyMedium">Cantidad: {item.quantity}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={()=>showPricePlus21(item.price)}>Precio + 21%</Button>
                        <Button>Editar </Button>
                    </Card.Actions>
                </Card>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000000'
    },
    container : {
        padding: 10
    }
})

export default ItemDetails
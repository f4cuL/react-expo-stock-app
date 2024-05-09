import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Button, Card, MD3Colors, Modal, Portal, Text } from 'react-native-paper';
import Form from '../components/Form';
import { deleteClothes } from '../services/db-service';
import { emitRefreshDataFromDB } from '../services/event-service';

const ItemDetails = ({navigation, route}) => {

    const [item, setItem] = useState(route.params.item)
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    
    const showPricePlus21 = (price) => {
        let pricePlus21 = (Number(price) + Number(price)*0.21).toString();
        Alert.alert("Precio sumando 21%", pricePlus21);
    }

    const deleteItem = (item) => {
        Alert.alert('¡Atención!', `¿Estás seguro que quieres eliminar ${item.name}?`, [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Eliminar', onPress: () => deleteClothes(item.id).then(() => {
                    emitRefreshDataFromDB();
                    navigation.navigate("Inicio");
                })
            },
        ]);;
    }  

    return (
        <>
            <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
                        <Form hideModal={hideModal} formAction={"update"} item={item} flagDB={route.params.flagDB} setFlagDB={route.params.setFlagDB} setItem={setItem} navigation/>
                    </Modal>
            </Portal>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.container}>
                    <Card>
                        <Card.Content>
                            <Text variant="titleLarge">{item.name}</Text>
                            <Text variant="bodyMedium">${item.price}</Text>
                            <Text variant="bodyMedium">Cantidad: {item.quantity}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={()=>showPricePlus21(item.price)} icon="percent">Precio + 21%</Button>
                            <Button icon="square-edit-outline" mode="contained" onPress={showModal}>
                                Editar
                            </Button>
                        </Card.Actions>
                    </Card>
                    <Button icon="delete"
                        mode="contained"
                        onPress={() => deleteItem(item)} 
                        theme={{ colors: { primary: '#d9534f' }}}>
                            Borrar
                    </Button>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000000'
    },
    container : {
        padding: 10
    },
    modalStyle: {
        backgroundColor: MD3Colors.primary0,
        borderRadius: 15,
        padding: 20,
        marginBottom: 200
    }
})

export default ItemDetails
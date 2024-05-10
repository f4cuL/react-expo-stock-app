import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Button, Card, Divider, MD3Colors, Modal, Portal, Text, TextInput } from 'react-native-paper';
import Form from '../components/Form';
import { deleteClothes } from '../services/db-service';
import { emitRefreshDataFromDB } from '../services/event-service';
import AwesomeAlert from 'react-native-awesome-alerts';

const ItemDetails = ({navigation, route}) => {

    const [item, setItem] = useState(route.params.item)
    const [visible, setVisible] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertPercentage, setShowAlertPercentage] = useState(false)
    const [percentageState, setPercentageState] = useState(20)
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    
    const showPricePlusPercentage = (percentage) => {
        let finalPrice = (Number(item.price) + percentage*item.price/100).toString();
        return finalPrice;
    }

    const deleteItem = (item) => {
        deleteClothes(item.id).then(() => {
            emitRefreshDataFromDB();
            navigation.navigate("Inicio");
        })
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
                            <Button icon="square-edit-outline" mode="contained" onPress={showModal}>
                                Editar
                            </Button>
                        </Card.Actions>
                    </Card>
                    <Button icon="delete"
                        mode="contained"
                        style={{borderRadius: 0}}
                        onPress={() => setShowAlert(true)} 
                        theme={{ colors: { primary: '#d9534f' }}}>
                            Borrar
                    </Button>
                    <Divider style={{marginBottom:10, marginTop:10}}/>
                    <TextInput
                        label="Porcentaje"
                        keyboardType='numeric'
                        right={<TextInput.Icon icon="percent" />}
                        value={percentageState}
                        onChangeText={(data) => setPercentageState(data)}
                    />
                    <Button
                        mode="contained"
                        style={{borderRadius: 0}}
                        onPress={() => setShowAlertPercentage(true)} 
                        >
                            Calcular porcentaje
                    </Button>
                </ScrollView>

                <AwesomeAlert
                    show={showAlert}
                    title="Precaución"
                    message={`¿Estás seguro que quieres eliminar ${item.name}?`}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No, cancelar"
                    confirmText="Si, eliminar"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        setShowAlert(false);
                    }}
                    onConfirmPressed={() => {
                        deleteItem(item);
                    }}
                    />

                <AwesomeAlert
                    show={showAlertPercentage}
                    title="Calculo"
                    closeOnTouchOutside={false}
                    message={`El total sumado el ${percentageState}% es ` + showPricePlusPercentage(percentageState)}
                    closeOnHardwareBackPress={false}
                    showConfirmButton={true}
                    confirmText="OK"
                    confirmButtonColor="#DD6B55"
                    onConfirmPressed={() => {
                        setShowAlertPercentage(false);
                    }}
                />
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
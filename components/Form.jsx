import React, { useState } from 'react';
import { Alert, NativeEventEmitter, StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { insertClothes, updateClothes } from '../services/db-service';
import { emitRefreshDataFromDB } from '../services/event-service';


const Form = ({ hideModal, formAction, item, setItem }) => {
    let initialStateName = item ? item.name : "";
    let initialStateQuantity = item ? item.quantity : "";
    let initialStatePrice = item ? item.price : "";
    
    const [name, setName] = useState(initialStateName);
    const [quantity, setQuantity] = useState(initialStateQuantity)
    const [price, setPrice] = useState(initialStatePrice)
    const [nameError, setNameError] = useState(false);
    const [quantityError, setQuantityError] = useState(false)
    const [priceError, setPriceError] = useState(false)
    
    const validateFields = () => {
        let error = false;
        setNameError(false);
        setQuantityError(false);
        setPriceError(false);
        if (name === "") {
            setNameError(true);
            error = true;
        }
        if (quantity === "") {
            setQuantityError(true);
            error = true;
        }
        if (price === "") {
            setPriceError(true);
            error = true;
        }
        return error;
    }
    
    const addClothes = () => {
        error = validateFields();
        if (error) {
            Alert.alert('Error', 'Alguno de los campos presenta un error', [
                {
                    text: 'OK', onPress: () => console.log('OK Pressed')
                },
            ]);
        }
        else {
            formAction === "add" 
            ? 
            insertClothes(name,quantity,price)
            :   
            updateClothes(name, quantity, price, item.id).then(() => {
                let updatedItem = { ...item, name, quantity, price };
                setItem(updatedItem);
            });
            emitRefreshDataFromDB();
            cancel();
        }
    }
    const cancel = () => {
        hideModal()
    }
    
    return (
        <>
            <TextInput
                label="Nombre"
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.textArea}
                error={nameError}
                />
            <HelperText type="error" visible={nameError}>
                El nombre está vacío
            </HelperText>

            <TextInput
                label="Precio"
                value={price.toString()}
                onChangeText={(text) => setPrice(text)}
                keyboardType='numeric'
                style={styles.textArea}
                error={priceError}
                />
            <HelperText type="error" visible={priceError}>
                El precio está vacío
            </HelperText>
            <TextInput
                label="Cantidad"
                value={quantity.toString()}
                onChangeText={(text) => setQuantity(text)}
                keyboardType='numeric'
                style={styles.textArea}
                error={quantityError}
            />
            <HelperText type="error" visible={quantityError}>
                La cantidad está vacía
            </HelperText>
            <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                <Button icon="cancel" mode="contained" onPress={cancel} style={{ marginRight: 10 }} theme={{ colors: { primary: '#d9534f' } }} >
                    Cancelar
                </Button>
                <Button icon={ formAction === "add" ? "plus-circle" : "square-edit-outline" } mode="contained" onPress={addClothes} style={{ marginRight: 10 }} theme={{ colors: { primary: 'lightgreen' } }}>
                    { formAction === "add" ? "Añadir" : "Editar" }
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    textArea: {
        padding: 5,
        margin: 10
    }
})

export default Form
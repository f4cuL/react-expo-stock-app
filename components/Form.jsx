import React, { useState } from 'react'
import { TextInput, Button, HelperText } from 'react-native-paper'
import { View, StyleSheet, Alert } from 'react-native'
import { insertClothes } from '../services/db-service';

const Form = ({ hideModal, setFlagDB, flagDB }) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")
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
    
    const hasErrors = () => {
        return name == "";
    };

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
            insertClothes(name,quantity,price);
            setFlagDB(!flagDB);
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
                value={price}
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
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
                keyboardType='numeric'
                style={styles.textArea}
                error={quantityError}
            />
            <HelperText type="error" visible={quantityError}>
                La cantidad está vacía
            </HelperText>
            <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                <Button icon="check" mode="contained" onPress={addClothes} style={{ marginRight: 10 }} theme={{ colors: { primary: 'lightgreen' } }}>
                    Añadir
                </Button>
                <Button icon="delete" mode="contained" onPress={cancel} style={{ marginRight: 10 }} theme={{ colors: { primary: '#d9534f' } }} >
                    Cancelar
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
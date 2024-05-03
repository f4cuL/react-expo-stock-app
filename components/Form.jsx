import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper'
import { View, StyleSheet} from 'react-native'

const Form = ({hideModal}) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("")   
    const [price, setPrice] = useState("")

    const addClothes = () => {
        console.log(name,quantity,price)
    }
    const cancel = () => {
        hideModal()
    }

    return (
        <View>
            <TextInput
            label="Nombre"
            value={name}
            onChangeText={(text)=> setName(text)}
            style={styles.textArea}
            />
            <TextInput
            label="Precio"
            value={price}
            onChangeText={(text)=>setPrice(text)}
            keyboardType='numeric'
            style={styles.textArea}
            />
            <TextInput
            label="Cantidad"
            value={quantity}
            onChangeText={(text)=>setQuantity(text)}
            keyboardType='numeric'
            style={styles.textArea}
            />
            <View style={{ flexDirection:"row", justifyContent:'center' }}>
                <Button icon="check" mode="contained" onPress={addClothes} style={{ marginRight: 10 }} theme={{colors: { primary: 'lightgreen'}}}>
                    Añadir
                </Button>
                <Button icon="delete" mode="contained" onPress={cancel} style={{ marginRight: 10 }} theme={{colors: { primary: 'red'}}} >
                    Cancelar
                </Button>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    textArea: {
        padding: 5,
        margin: 10
    }
})

export default Form
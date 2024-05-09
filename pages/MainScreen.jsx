import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Button, Divider, List, MD3Colors, Modal, Portal } from 'react-native-paper';
import Form from '../components/Form';
import { getAllClothes, initDB } from '../services/db-service';
import { NativeEventEmitter } from 'react-native';


const eventEmitter = new NativeEventEmitter();


const MainScreen = ({ navigation }) => {
    
    const [clothes, setClothes] = useState([]);
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    useEffect(() => {
        initDB();
        eventEmitter.addListener('reload-data', event => {
            console.log(event)
            getAllClothes().then(data => setClothes(data));
        });
        return () => {
            eventEmitter.removeAllListeners("reload-data");
        }
    }, [])

    useEffect(() => {
        getAllClothes().then(data => setClothes(data));
    }, [])


    return (
        <>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
                    <Form hideModal={hideModal} formAction={"add"} />
                </Modal>
            </Portal>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.container}>
                    <Button icon="plus" mode="contained" onPress={showModal}>
                        Agregar prenda
                    </Button>
                    <List.Section>
                        {
                            clothes.map((item, index) =>
                                <React.Fragment key={index}>
                                    <List.Item title={item.name}
                                        left={() => <List.Icon icon="hanger" />}
                                        description={`Cantidad: ${item.quantity} $${item.price}`}
                                        onPress={() => navigation.navigate('Detalles', { item })}
                                        key={item.id} />
                                    <Divider />
                                </React.Fragment>
                            )
                        }
                    </List.Section>
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
    container: {
        flex: 1,
        padding: 20,
    },
    modalStyle: {
        backgroundColor: MD3Colors.primary0,
        borderRadius: 15,
        padding: 20,
        marginBottom: 200
    }
})

export default MainScreen
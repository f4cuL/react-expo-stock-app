import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Button, List, MD3DarkTheme, Modal, PaperProvider, Portal, Text, MD3Colors } from 'react-native-paper';
import { getAllClothes, initDB } from './services/db-service';
import Form from './components/Form';

export default function App() {
  
  const [clothes, setClothes] = useState([]);
  const [flagDB, setFlagDB] = useState(false);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  
  useEffect(() => {
    initDB();
  }, [])

  useEffect(() => {
    getAllClothes().then(data => setClothes(data));
  }, [flagDB])

  const theme = {
    ...MD3DarkTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#3498db',
      secondary: '#f1c40f',
      tertiary: '#a1b2c3',
    },
  };

  return (
    <PaperProvider theme={theme}>
        <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalStyle}>
          <Form hideModal = {hideModal}/>
        </Modal>
      </Portal>
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}> 
      <Button icon="plus" mode="contained" onPress={showModal}>
        Agregar prenda
      </Button>
        <List.Section>
          {
            clothes.map(item => <List.Item title={item.name} left={() => <List.Icon icon="hanger" />} description={`Cantidad: ${item.quantity} $${item.price}` } onPress={() => console.log(item)} key={item.id}/>)
          }
        </List.Section>
        </ScrollView> 
      </SafeAreaView> 
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 40
  },
  container: {
    flex: 1,
    padding: 20,
  },
  modalStyle: {
    backgroundColor: MD3Colors.primary0,
    borderRadius: 15,
    padding: 20
  }
})
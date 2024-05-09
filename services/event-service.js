import { NativeEventEmitter } from "react-native";

const eventEmitter = new NativeEventEmitter();

export const emitRefreshDataFromDB = () => {
    eventEmitter.emit('reload-data', 'Getting data from database');
}
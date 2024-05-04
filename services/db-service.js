import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('stock-db.db');

export const initDB = () => {
    db.transaction(tx => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS clothes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, quantity INTEGER NOT NULL, price INTEGER NOT NULL);",
            [],
            () => console.log('Table created successfully'),
            (_, err) => console.error('Failed to create table', err)
        );
    });
};
export const drop = () => {
    db.transaction(tx => {
        tx.executeSql(
            "DROP TABLE CLOTHES;",
            [],
            () => console.log('Table created successfully'),
            (_, err) => console.error('Failed to create table', err)
        );
    });
};

export const insertClothes = async (name, quantity, price) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO clothes(NAME, QUANTITY, PRICE) VALUES("${name}",${quantity},${price});`,
            [],
            () => console.log('Clothes added succesfully'),
            (_, err) => console.error('Failed to add the data', err)
        );
    });
};

export const getAllClothes = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM CLOTHES;",
                [],
                (_, result) => {
                    resolve(result.rows._array);
                },
                (_, err) => {
                    console.error('Failed to fetch clothes', err);
                    reject(err);
                }
            );
        });
    });
};
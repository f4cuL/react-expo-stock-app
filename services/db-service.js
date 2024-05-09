import * as SQLite from 'expo-sqlite/legacy';

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

export const updateClothes = (name, quantity, price, id) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE clothes SET name = "${name}", 
                quantity = ${quantity}, 
                price = ${price} 
                WHERE id = ${id};`,
                [],
                () => resolve('Clothes updated successfully'),
                (_, err) => reject('Failed to add the data', err)
            );
        });
    });
};

export const insertClothes = async (name, quantity, price) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO clothes(NAME, QUANTITY, PRICE) VALUES("${name}",${quantity},${price});`,
                [],
                () => resolve('Clothes added successfully'),
                (_, err) => reject('Failed to add the data', err)
            );
        });
    });
};

export const deleteClothes = async (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM clothes WHERE id = ${id};`,
                [],
                () => resolve('Deleted item succefully'),
                (_, err) => reject('Failed to add the data', err)
            );
        });
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
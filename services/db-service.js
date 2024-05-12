import Dexie from 'dexie';

export const db = new Dexie('stock-db');

export const initDB = () => {
    db.version(1).stores({
        clothes: '++id, name, quantity, price' // Primary key and indexed props
    });
};

export const getAllClothes = async () => {
    return new Promise((resolve, reject) => {
        db.clothes.toArray()
            .then(data => {
                console.log("getAllClothes")
                resolve(data.sort((a, b) => a.name.localeCompare(b.name)))
            })
            .catch(error => reject(error));
    });
};

export const insertClothes = async (name, quantity, price) => {
    return new Promise((resolve, reject) => {
        db.clothes.add({ name, quantity, price })
            .then(id => {
                console.log("insertClothes")
                resolve(id)
            })
            .catch(error => reject(error))
    });
};

export const updateClothes = (name, quantity, price, id) => {
    return new Promise((resolve, reject) => {
        db.clothes.put({ name, quantity, price, id })
            .then(id => {
                console.log("updateClothes")
                resolve(id)
            })
            .catch(error => reject(error))
    });
};

export const deleteClothes = (id) => {
    return new Promise((resolve, reject) => {
        db.clothes.delete(id)
            .then(id => {
                console.log("deleteClothes")
                resolve(id)
            })
            .catch(error => reject(error))
    });
};

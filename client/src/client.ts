import { Identity } from "./models";

let baseHostUrl = '/api';

// eslint-disable-next-line no-restricted-globals
if (location.hostname === 'localhost:3000') {

    // If you're running locally without the SWA emulator then the port of the express server
    // is set to 3001.
    baseHostUrl = 'http://localhost:3001/api';
    console.log('Warning: Running without emulator. Role and authorization will not be taken into account.');
}

export const getItems = async () => {
    return await fetch(`${baseHostUrl}/items`);
}

export const addItem = async (description: string) => {
    return await fetch(`${baseHostUrl}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: description })
    });
}

export const deleteItem = async (id: number) => {
    return await fetch(`${baseHostUrl}/items/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    });
}

export const getUserInfo = async () => {
    const response = await fetch(`/.auth/me`);
    return await response.json() as Identity;
}
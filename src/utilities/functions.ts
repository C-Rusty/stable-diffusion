export const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:",.<>?/`~';
    const charactersLength = characters.length;

    let stringLength: number = 64;

    let result = '';

    for (let i = 0; i < stringLength; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters[randomIndex];
    }

    return result;
};

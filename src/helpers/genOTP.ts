
const startNumber = 100000;
const endNumber = 900000

export const genOTP = () => {
    return Math.floor( startNumber + Math.random() * endNumber )
}
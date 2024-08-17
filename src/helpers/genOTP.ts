import { getNextDate } from './getDate';

const startNumber : number = 100000;
const endNumber : number = 900000;
const milisInOneMinute : number = 3600 * 1000;

export const genOTP = () : number => {
    return Math.floor( startNumber + Math.random() * endNumber )
}

export const genOTPExpired = () : Date => {
    const now = getNextDate();
    const milisAtNow = now.getTime();
    const milisAtExpired = ( 2 * milisInOneMinute ) + milisAtNow; 
    const otpExpired = new Date( milisAtExpired );

    return otpExpired;
}
import { transportation, getMailOption } from '../constants/sendOtpForm';
import { genOTP } from './genOTP';
import nodemailer from 'nodemailer'

type userDataBase =  { 
    email : string, 
    name : string 
} 

export const sendEmail = async ( userData : userDataBase ) => {
    try {
        const transporter = nodemailer.createTransport( transportation );
        const otp = genOTP();

        try {
            const result = await transporter.sendMail( getMailOption( userData, otp ) );
            console.log( result.response )
            return result.response

        } catch ( error : any ) {
            console.log( error )
            throw new Error( error );
        }

    } catch ( error : any ) {
        console.log( error )
        throw new Error("Send Email has an Error")
    }

}
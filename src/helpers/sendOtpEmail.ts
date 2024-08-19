import { userDataBase } from './../constants/constantType';
import { transportation, getMailOption } from '../constants/sendOtpForm';
import nodemailer from 'nodemailer'

export const sendOtpEmail = async ( userData : userDataBase ) => {
    try {
        const transporter = nodemailer.createTransport( transportation );

        try {
            await transporter.sendMail( getMailOption( userData ) );

        } catch ( error : any ) {
            console.log( error )
            throw new Error( error );
        }

    } catch ( error : any ) {
        console.log( error )
        throw new Error("Send Email has an Error")
    }

}
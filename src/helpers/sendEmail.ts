import { genOTP } from './genOTP';
import env from "../env";
import nodemailer from 'nodemailer'

const Email = env.envEmail.EMAIL || "your-Email"
const Password = env.envEmail.PASSWORD || "your-Password"

const transportation : {
    service : string,
    auth : {
        user : string,
        pass : string
    }
} = {
    service : "gmail",
    auth : {
        user : Email,
        pass : Password
    }
}

export const sendEmail = async ( userData : { email : string, name : string } ) => {
    try {
        const transporter = nodemailer.createTransport( transportation );
        const randomOTP = genOTP();
        
        const mailOption : {
            from : string,
            to : string,
            subject : string,
            html : string
        } = {
            from : Email,
            to : userData.email,
            subject : `OTP to validate your account`,
            html : 
            `
                <html>
                <head>
                    <title>Email Template</title>
                </head>
                <body>
                    <h1>Hello, <b> ${ userData.name } </b>!</h1>
                    <p> Here is your OTP : ${ randomOTP } </p>
                </body>
                </html>
            `
        }

        try {
            const result = await transporter.sendMail( mailOption );
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
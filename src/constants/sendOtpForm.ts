import { transportType, userDataBase, mailOptionType } from './constantType';
import env from '../env';
const Email = env.envEmail.EMAIL || "your-Email"
const Password = env.envEmail.PASSWORD || "your-Password"

export const transportation : transportType = {
    service : "gmail",
    auth : {
        user : Email,
        pass : Password
    }
}
export const getMailOption = ( userData : userDataBase ) : mailOptionType => {
    return {
        from : Email,
        to : userData.email,
        subject : "OTP for Todo App",
        html : 
        `
        <html>
            <head>
                <title>Email Template</title>
            </head>
            <body>
                <h1>Hello, <b> ${ userData.name } </b>!</h1>
                <p> Here is your OTP : ${ userData.otp } </p>
            </body>
            </html>
        `
    }
}
import env from '../env';
const Email = env.envEmail.EMAIL || "your-Email"
const Password = env.envEmail.PASSWORD || "your-Password"

type transportType = {
    service : string,
    auth : {
        user : string,
        pass : string
    }
}
type mailOptionType = {
    from : string,
    to : string,
    subject : string,
    html : string
}
type userDataBase =  { 
    email : string, 
    name : string 
} 
export const transportation : transportType = {
    service : "gmail",
    auth : {
        user : Email,
        pass : Password
    }
}
export const getMailOption = ( userData : userDataBase, otp : number ) : mailOptionType => {
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
                <p> Here is your OTP : ${ otp } </p>
            </body>
            </html>
        `
    }
}
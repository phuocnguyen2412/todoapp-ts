export type transportType = {
    service : string,
    auth : {
        user : string,
        pass : string
    }
}
export type mailOptionType = {
    from : string,
    to : string,
    subject : string,
    html : string,
    attachments: any
}
export type userDataBase =  { 
    email : string, 
    name : string ,
    otp : string
} 
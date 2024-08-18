import { transportType, userDataBase, mailOptionType } from './constantType';
import env from '../env';
import path from "path"

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
    <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
       .container{
            background-color: rgb(157, 165, 171);
            margin: 0 auto;
            width: 500px;
            height: 600px;
            padding: 20px;
       } 
       .body{
            width: 500px;
            height: 600px;
            background-color: rgb(255, 255, 255);
        }
        img{
            margin-top: 20px;
            width: 200px;
            height: 200px;
            margin-left:150px;
        }
        .Text{
            width: 100%;
            flex-direction: column;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-weight: 600;
        }
        .Text_header,.Text_header2{
            font-size: 28px;
            text-align: center;
            color: rgb(11, 9, 9);
        }
        .Text_header2{
            font-size: 45px;
            color: rgb(69, 146, 205);
        }
        .Text_Otp{
            width: 90%;
            height: 100px;
            margin: 0 auto;
            background-color: rgb(179, 237, 237);
            margin-top: 30px;
            font-size: 40px;
            text-align:center;
            letter-spacing: 5px;
            color: rgb(13, 12, 12);
            margin:0 auto;
        }
        .cc{
            height:15px;
            width:100%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="body">
            <img src="cid:@logo" alt="">
            <div class="line"></div>
            <div class="Text">
                <div class="Text_header">
                    ${userData.name} rất đẹp zai
                </div>
                <div class="Text_header2">
                    Your OTP
                </div>
                <div class="Text_Otp">
                    <div class="cc"></div>
                     ${userData.otp}
                </div>
            </div>
        </div>
</div>
</body>
</html>
        `,
        attachments: [
            {
                filename: 'logo.png',
                path: path.join(__dirname, '../Logo S-Group', 'logo.png'),
                cid: '@logo' 
            }
        ]
    }
}
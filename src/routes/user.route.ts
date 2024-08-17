import  express  from "express"
import { confirmOtp } from "../controllers/user/user.controller"



const userRoute = express.Router()


userRoute.post('/confirmOtp',confirmOtp)
userRoute.post('/isValidate',)

export default userRoute
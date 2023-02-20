import express from "express";
import {getMe} from "../../controllers/auth/getMe.js"
import {register} from '../../controllers/auth/register.js'
import {login} from '../../controllers/auth/login.js'
import {checkAuth} from "../../utils/checkAuth.js";
import {logout} from "../../controllers/auth/logout.js";
import {auth} from '../../middlewares/auth.js'
import {ctrlWrapper} from "../../middlewares/ctrlWrapper.js";
import multer from "multer";

//file storage
const storage = multer.diskStorage(({
    destination: function(req, file, cb){
        cb(null, "public/assets");

    },
    filename(req, file, cb){
        cb(null, file.originalname)
    }
}));

const upload = multer({storage})


const router=express.Router()

//Register
router.post('/register',upload.single('picture'),ctrlWrapper(register))
//Login
router.post('/login',ctrlWrapper(login))
//logOut
router.post('/logout', auth,ctrlWrapper(logout))
//Get me
router.get('/me',checkAuth,ctrlWrapper(getMe))




export default router
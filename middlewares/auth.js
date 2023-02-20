import  User from '../models/User.js'
import jwt from 'jsonwebtoken'
import Unauthorized from 'http-errors'
const {JWT_SECRET} = process.env

export const auth = async (req, res, next) => {

    const {authorization = " "} = req.headers
    const [bearer, token] = authorization.split(" ")
    if(bearer !== 'Bearer') {
        throw new Unauthorized('Not authorized')
    }
    try{
        const {id} = jwt.verify(token, JWT_SECRET)

        const user = await User.findById(id)
        if( !user || !user.token) {
            throw new Unauthorized('Not authorized')

        }
        req.user = user;
        next();
    } catch (error){
        if(error.message === "Invalid signature") {
            error.status = 401
        }
        next(error)
    }

}



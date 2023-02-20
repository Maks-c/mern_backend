// import User from "../../models/User.js";
// import jwt from "jsonwebtoken";
//
// export const login = async (req, res) => {
//     const {email, password} = req.body
//     console.log(email.req.body)
//     const user = await User.findOne({email})
//     if( !user) return res.status(400).json({status: 'User does not exist.'})
//     const isMatch = await bcrypt.compareSync(password, user.password)
//     if( !isMatch) return res.status(400).json({status: 'Invalid credentials.'})
//     const payload = {
//         id: user._id
//     }
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '10d'})
//     await User.findByIdAndUpdate(user._id, {token})
//     delete user.password;
//     res.status(200).json({token, user, status: 'You are logged in'})
// }

import User from '../../models/User.js'
import Unauthorized from 'http-errors'
import jwt from "jsonwebtoken";


import bcrypt from 'bcryptjs'

export const login = async (req, res) => {

    const {email, password} = req.body
    const user = await User.findOne({email});
    const passCompare = bcrypt.compareSync(password, user.password);
    if( !user || !passCompare) {
        throw new Unauthorized('Email or password is wrong ')
    }
    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.SECRET_KEY,
        { expiresIn: '30d' },
    )
    console.log(token)

    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        status: 'success',
        code: 200,
        token,
        data: {
            email,

        }
    })
}
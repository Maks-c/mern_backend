// import jwt from 'jsonwebtoken'
import User from "../../models/User.js"
import Conflict from 'http-errors'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

//REGISTER USER
 export const register = async (req, res) => {
    const {
        username,
        firstname,
        lastname,
        email,
        password,
        picturePath,
        friends,
        location,
    } = req.body
    const user = await User.findOne({email})
    if(user) {
        throw new Conflict(`User with ${email} already exist`)
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const result = await User.create({
        username,
        firstname,
        lastname,
        email,
        password: hashPassword,
        picturePath,
        friends,
        location,
    });
    const token = jwt.sign(
        {
            id: result._id,
        },
        process.env.SECRET_KEY,
        { expiresIn: '30d' },
    )

    res.status(201).json({
        status: 'success',
        code: 201,
        token,
        data: {
            user: {
                result,
            }
        }

    });
}


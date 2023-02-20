import User from "../../models/User.js";
import jwt from "jsonwebtoken";

export const getMe = async (req, res) => {
    try{
        const user = await User.findById(req.userId)
        if( !user) return res.status(400).json({message: 'User does not exist.'})
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '10d'})
        res.status(200).json({user, token})
    } catch (err){
        res.status(500).json({error: err.message});
    }
}
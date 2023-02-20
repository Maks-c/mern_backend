import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        username:{
            type:String,
            require:true,
            min:2,
            max:50,
        },
        firstname: {
            type: String,
            require: true,
            min: 2,
            max: 50,
        },
        lastname: {
            type: String,
            require: true,
            min: 2,
            max: 50,
        },
        picturePath: {
            type: String,
            default: ''
        },
        friends: {
            type: Array,
            default: []
        },
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }],
        // location: String,
        // occupation: String,
        // viewedProfile: Number,
        // impressions: Number
    },
    {timestamps: true}
)





const User = mongoose.model('User', UserSchema)
export default User
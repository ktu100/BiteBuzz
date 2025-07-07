import userModel from "../modals/userModal.js";
import jwt from 'jsonwebtoken'
import bycrypt from 'bcrypt'
import validator from 'validator'

// LOGIN USER
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Doesn't Exist" })
        }

        
        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        
        const token = createToken(user._id);
        res.json({ success: true, token })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// REGISTER USER
const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exists" })
        }

       
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please Enter A Valid Email" })
        }

       
        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter A Strong Password" })
        }

        
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt);

        
        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPassword
        })
        
        const user = await newUser.save()

        
        const token = createToken(user._id)
        res.json({ success: true, token })

    }

    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { loginUser, registerUser }
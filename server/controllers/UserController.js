
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // Register User: /api/user/register
// export const register = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Validate required fields
//         if (!name || !email || !password) {
//             return res.status(400).json({ success: false, message: 'Missing details' });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: 'User already exists' });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const user = await User.create({
//             name,
//             email,
//             password: hashedPassword
//         });

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: '7d',
//         });

//         // Send token in cookie
//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//             maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//         });

//         // Respond with user info
//         return res.status(201).json({
//             success: true,
//             user: {
//                 name: user.name,
//                 email: user.email,
//             },
//         });

//     } catch (error) {
//         console.error("Register error:", error.message);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };



// //Login User : /api/user/login


// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password)
//             return res.json({ success: false, message: 'Email and password are required!' });

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.json({ success: false, message: 'Invaild email or password' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password)

//         if (!isMatch)
//             return res.json({ success: false, message: 'Invaild email or password' });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: '7d',
//         });

//         // Send token in cookie
//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//             maxAge: 7 * 24 * 60 * 60 * 1000,
//         });

//         // Respond with user info
//         return res.status(201).json({
//             success: true,
//             user: {
//                 name: user.name,
//                 email: user.email,
//             },
//         });

//     }
//     catch (error) {
//         console.error("Register error:", error.message);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// }


// // Check Auth : /api/user/is-auth

// export const isAuth = async (req, res) => {
//     try {
//         const { userId } = req.userId;
//         const user = await User.findById(userId).select("-password")
//         return res.json({ success: true, user })
//     }
//     catch (error) {
//         console.log(error.message);
//         res.json({ success: false, message: error.message });
//     }
//     console.log(isAuth);
    
// }

// //Logout User : /api/user/logout

// export const logout = async (req, res) => {
//     try {
//         res.clearCookie('token', {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//         });

//         return res.json({ success: true, message: "Logged Out" });
//     } catch (error) {
//         console.log(error.message);
//         return res.json({ success: false, message: error.message });
//     }
// };





// controllers/UserController.js

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({
            success: true,
            user: { name: user.name, email: user.email }
        });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: 'Email and password are required!' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Check Auth
export const isAuth = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.json({ success: true, user });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Logout User
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
};

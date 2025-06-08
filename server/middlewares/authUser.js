

// import jwt from "jsonwebtoken";

// const authUser = async (req, res, next) => {
//     const { token } = req.cookies;

//     if (!token) {
//         return res.status(401).json({ success: false, message: 'Not Authorized' });
//     }

//     try {
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

//         if (tokenDecode.id) {
//             req.userId = tokenDecode.id;
//             next();
//         } else {
//             return res.status(401).json({ success: false, message: 'Not Authorized' });
//         }
//     } catch (error) {
//         return res.status(401).json({ success: false, message: error.message });
//     }
// };

// export default authUser;


// middlewares/authUser.js
import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  // const { token } = req.cookies;



  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

     if(!decoded || !decoded.id){
            return res.json({success: false, message: "Not authorized"});
        }

    req.id = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;







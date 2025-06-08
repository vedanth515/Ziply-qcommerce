
// // Update User CartData : api/cart/update

// import User from "../models/User.js";


// export const updateCart = async (req, res) => {
//     try {
//         const { userId, cartItems } = req.body;
//         await User.findByIdAndUpdate(userId, { cartItems })
//         res.json({ success: true, message: "Cart Updated" })

//     } catch (error) {
//         console.log(error.message)
//         res.json({ success: false, message: error.message })
//     }
// }


// import User from "../models/User.js";

// // POST /api/cart/update
// export const updateCart = async (req, res) => {
//     try {
//         const userId = req.user._id;  // Use authenticated user
//         const { cartItems } = req.body;

//         if (!cartItems || typeof cartItems !== 'object') {
//             return res.status(400).json({ success: false, message: "Invalid cart data" });
//         }

//         await User.findByIdAndUpdate(req.userId, { cartItems });

//         res.json({ success: true, message: "Cart updated successfully" });
//     } catch (error) {
//         console.error("Cart update error:", error.message);
//         res.status(500).json({ success: false, message: "Server error while updating cart" });
//     }
// };



// controllers/cartController.js

import User from "../models/User.js";

export const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.id; // ✅ coming from auth middleware

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized: No user ID" });
    }

    await User.findByIdAndUpdate(userId, { cartItems });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.error("UpdateCart Error:", error); // 👈 log full error
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};









import Product from "../models/product.js";
import Order from "../models/Order.js";
import Address from "../models/Address.js"; // ✅ ✅ ✅ FIX 1: Import Address to register schema

// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.id;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" }); // ✅ Typo fixed: "Invaild" → "Invalid"
        }

        // Calculate Amount Using Items
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        // Add Tax Charge (2%)
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        return res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// Get User Orders
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.id;

        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }],
        })
            .populate("items.product")
            .populate("address") // ✅ FIX 2: This now works because Address is imported above
            .sort({ createdAt: -1 }); // ✅ FIX 3: Typo "createsAt" → "createdAt"

        console.log("Querying for user:", userId);
        console.log("Orders found:", orders.length);

        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get All Orders (for seller / admin)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }],
        })
            .populate("items.product")
            .populate("address") // ✅ FIX 4: Ensure populate is split correctly for clarity
            .sort({ createdAt: -1 }); // ✅ FIX 5: Typo "createsAt" → "createdAt"

        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

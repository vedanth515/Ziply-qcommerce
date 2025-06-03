// import { createContext, use, useActionState, useContext, useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/assets";
// import toast from "react-hot-toast";
// import axios from "axios";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {

//     const currency = import.meta.env.VITE_CURRENCY;


//     const navigate = useNavigate();

//     const [user, setUser] = useState(null)
//     const [isSeller, setIsSeller] = useState(false)
//     const [showUserLogin, setShowUserLogin] = useState(false)
//     const [products, setProducts] = useState([])
//     const [cartItems, setCartItems] = useState({})
//     const [searchQuery, setSearchQuery] = useState({})


//     // Fetch seller status
//     const fetchSeller = async () => {
//         try {
//             const { data } = await axios.get('/api/seller/is-auth');
//             if (data.success) {
//                 setIsSeller(true)
//             } else {
//                 setIsSeller(false)
//             }
//         } catch (error) {

//         }
//     }


//     // Fetch User Auth Status, User Data and Cart Items

//     const fetchUser = async () => {
//         try {
//             const { data } = await axios.get('/api/user/is-auth');
//             if (data.success) {
//                 setUser(data.user)
//                 setCartItems(data.user.cartItems)
//             }
//         } catch (error) {
//             setUser(null)
//         }
//     }




//     //Fetching All Products From Here
//     const fetchProducts = async () => {
//         //    setProducts(dummyProducts)
//         try {
//             const { data } = await axios.get('api/product/list')
//             if (data.success) {
//                 setProducts(data.products)
//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             toast.error(error.message)
//         }
//     }



//     // Add Product to Cart
//     // const addToCart = (itemId) => {
//     //     console.log(cartItems,"cart itmes")
//     //     let cartData = structuredClone(cartItems)
//     //     console.log(cartData,"cart data comming from add")

//     //     if (cartData[itemId]) {
//     //         cartData[itemId] += 1;
//     //     } else {
//     //         cartData[itemId] = 1;
//     //     }
//     //     setCartItems(cartData);
//     //     toast.success("Added to Cart")
//     // }

//     const addToCart = (itemId) => {
//         setCartItems(prevCartItems => {
//             const cartData = structuredClone(prevCartItems || {});
//             if (cartData[itemId]) {
//                 cartData[itemId] += 1;
//             } else {
//                 cartData[itemId] = 1;
//             }
//             return cartData;
//         });
//         toast.success("Added to Cart");
//     }



//     //Update Cart Item Quantity
//     const updateCartItems = (itemId, quantity) => {
//         let cartData = structuredClone(cartItems);
//         cartData[itemId] = quantity;
//         setCartItems(cartData)
//         toast.success("Cart Updated")
//     }


//     //Remove Product from Cart
//     // const removeFromCart = (itemId) => {
//     //     let cartData = structuredClone(cartItems);
//     //     if (cartData[itemId]) {
//     //         cartData[itemId] -= 1;
//     //         if (cartData[itemId] === 0) {
//     //             delete cartData[itemId];
//     //         }
//     //     }
//     //     toast.success("Removed from Cart")
//     //     setCartItems(cartData)
//     // }

//     const removeFromCart = (itemId) => {
//         setCartItems(prevCartItems => {
//             const cartData = structuredClone(prevCartItems || {});
//             if (cartData[itemId]) {
//                 cartData[itemId] -= 1;
//                 if (cartData[itemId] === 0) {
//                     delete cartData[itemId];
//                 }
//             }
//             return cartData;
//         });
//         toast.success("Removed from Cart");
//     }

//     // Get Cart Item Count

//     const getCartCount = () => {
//         let totalCount = 0;
//         for (const item in cartItems) {
//             totalCount += cartItems[item]
//         }
//         return totalCount;
//     }



//     const getCartAmount = () => {
//         let totalAmount = 0;
//         for (const items in cartItems) {
//             let itemInfo = products.find((product) => product._id === items);
//             if (cartItems[items] > 0) {
//                 totalAmount += itemInfo.offerPrice * cartItems[items]
//             }
//         }
//         return Math.floor(totalAmount * 100) / 100;
//     }

//     // Get Cart Total Amount
//     //     const getCartAmount = () => {
//     //     let totalAmount = 0;
//     //     for (const itemId in cartItems) {
//     //         const itemInfo = products.find(product => product._id === itemId);
//     //         if (itemInfo && cartItems[itemId] > 0) {
//     //             totalAmount += itemInfo.offerPrice * cartItems[itemId];
//     //         }
//     //     }
//     //     return Math.floor(totalAmount * 100) / 100;
//     // };




//     useEffect(() => {
//         fetchUser()
//         fetchProducts()
//         fetchSeller()
//     }, [])



//     // Update database Cart items
//     useEffect(() => {
//         const updateCart = async () => {
//             try {
//                 const { data } = await axios.post('/api/cart/update', { cartItems })

//                 if (!data.success) {
//                     toast.error(data.message)
//                 }
//             } catch (error) {
//                 toast.error(error.message)
//             }
//         }

//         if (user) {
//             updateCart()
//         }
//     }, [cartItems])

//     const value = { navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItems, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts }

//     return (
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     )
// }

// export const useAppContext = () => {

//     return useContext(AppContext)
// }










import { createContext, use, useActionState, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;


    const navigate = useNavigate();

    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState({})


    // Fetch seller status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth');
            if (data.success) {
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (error) {
            setCartItems(false)
        }
    }


    // Fetch user Auth status , User Data and Cart items

    // const fetchUser = async()=>{
    //     try {
    //         const {data} = await axios.get('/api/user/is-auth');
    //         if(data.success){
    //             setUser(data.user)
    //             setCartItems(data.user.cartItems)
    //         }
    //     } catch (error) {
    //          setUser(null)
    //     }
    // }

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/is-auth');
            if (data.success) {
                setUser(data.user);
                // Now fetch the cart for this user from the DB
                const cartRes = await axios.get(`/api/cart/${data.user._id}`);
                setCartItems(cartRes.data); // This should be a { productId: quantity } object
            }
        } catch (error) {
            setUser(null);
            setCartItems({});
        }
    };






    //Fetching All Products From Here
    const fetchProducts = async () => {
        //    setProducts(dummyProducts)
        try {
            const { data } = await axios.get('api/product/list')
            if (data.success) {
                setProducts(data.products)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }



    // Add Product to Cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }



    //Update Cart Item Quantity
    const updateCartItems = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Cart Updated")
    }


    //Remove Product from Cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Removed from Cart")
        setCartItems(cartData)
    }

    // Get Cart Item Count

    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item]
        }
        return totalCount;
    }

    // Get Cart Total Amount

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchUser()
        fetchProducts()
        fetchSeller()
    }, [])

    // Update Database Cart Items
    // useEffect(()=>{
    //       const updateCart =async ()=>{
    //         try {
    //             const {data} = await axios.post('/api/cart/update',{cartItems})
    //             if(!data.success){
    //                 toast.error(data.message)
    //             }
    //         } catch (error) {
    //             toast.error(error.message)
    //         }
    //       }

    //       if(user){
    //         updateCart()
    //       }
    // },[cartItems])


    // Update Database Cart Items
    useEffect(() => {
        const updateCart = async () => {
            try {
                // Only update if cartItems is a non-empty object
                if (Object.keys(cartItems).length > 0) {
                    const { data } = await axios.post('/api/cart/update', { cartItems });
                    if (!data.success) {
                        toast.error(data.message);
                    }
                }
            } catch (error) {
                toast.error("Failed to update cart");
            }
        };

        if (user) {
            updateCart();
        }
    }, [cartItems, user]);  // ✅ include user in dependency array




    const value = { navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItems, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, axios, fetchProducts }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {

    return useContext(AppContext)
}


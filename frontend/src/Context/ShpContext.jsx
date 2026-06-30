import React, { createContext, useState, useEffect } from "react";
import all_products from "../Components/Assets/all_products";
import API from "../services/api";
import { toast } from 'react-toastify';






// Create Context
export const ShopContext = createContext(null);


const ShopContextProvider = (props) => {

    const [wishlistItems, setWishlistItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const fetchCart = async () => {
        try {
            const user = localStorage.getItem("user");
            if (!user) return;
            const res = await API.get("/cart", {
                withCredentials: true
            });
            setCartItems(res.data.data.items || []);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchWishlist = async () => {
        try {

            const user = localStorage.getItem("user");
            if (!user) return;

            const res = await API.get(
                "/wishlist",
                {
                    withCredentials: true
                }
            );

            setWishlistItems(
                res.data.data.products || []
            );

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCart();
        fetchWishlist();
    }, []);

    // Add Item
    const addToCart = async (productId, size) => {
        try {
            await API.post(
                "/cart/add",
                {
                    productId,
                    quantity: 1,
                    size
                },
                {
                    withCredentials: true
                }
            );
            toast.success("Item added to cart 🛒");
            fetchCart();
        } catch (error) {
            console.log(error);
            toast.error("Failed to add item");
        }
    };

    // Remove Item
    const removeFromCart = async (productId) => {
        try {
            await API.delete(
                `/cart/remove/${productId}`,
                {
                    withCredentials: true
                }
            );
            fetchCart();
        } catch (error) {
            console.log(error);
        }
    };

    // Total Amount
    const getTotalCartAmount = () => {
        let total = 0;
        cartItems.forEach((item) => {

            total +=
                item.product.price *
                item.quantity;

        });
        return total;
    };

    // Total Cart Items
    const getTotalCartItems = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.quantity;
        });
        return total;
    };

    const addToWishlist = async (productId) => {
        try {
            await API.post(
                "/wishlist/add",
                {
                    productId
                },
                {
                    withCredentials: true
                }
            );
            toast.success("Added to Wishlist ❤️");
            fetchWishlist();
        }
        catch (error) {
            console.log(error);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            await API.delete(
                `/wishlist/${productId}`,
                {
                    withCredentials: true
                }
            );
            setWishlistItems((prev) =>
                prev.filter(
                    (item) => item._id !== productId
                )
            );
            toast.info("Removed from Wishlist");
        } catch (error) {
            console.log(error);
            toast.error("Failed to remove item");
        }
    };

    const contextValue = {
    all_products,
    cartItems,
    fetchCart,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    wishlistItems,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist
};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
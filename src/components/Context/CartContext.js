import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (plant) => {
        setCartItems((prevItems) => {
            // Check if plant already exists in cart
            const exists = prevItems.find((item) => item.id === plant.id);
            if (exists) {
                return prevItems;
            }
            return [...prevItems, plant];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
            <CartContext.Provider
                value={{ cartItems, addToCart, removeFromCart, clearCart }}
            >
                {children}
            </CartContext.Provider>
    );
}

import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Función para agregar un elemento al carrito
    const addToCart = (product) => {
        setCartItems((prevItems) => {
        // Buscar si el producto ya está en el carrito
        const existingItem = prevItems.find((item) => item.id === product.id);

        if (existingItem) {
            // Si el producto ya está en el carrito, actualizar la cantidad
            return prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            // Si el producto no está en el carrito, agregarlo con cantidad 1
            return [...prevItems, { ...product, quantity: 1 }];
        }
        });
    };

    // Función para incrementar la cantidad de un producto en el carrito
    const incrementQuantity = (productId) => {
        setCartItems((prevCartItems) =>
            prevCartItems.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Función para decrementar la cantidad de un producto en el carrito
    const decrementQuantity = (productId) => {
        setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
                item.id === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
        );
    };

    // Función para eliminar un elemento del carrito
    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    // Función para vaciar el carrito
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity }}>
        {children}
        </CartContext.Provider>
    );
};

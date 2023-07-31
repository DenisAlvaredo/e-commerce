import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useContext(CartContext);
    const navigate = useNavigate();
    const [purchaseCompleted, setPurchaseCompleted] = useState(false);

    const calculateSubtotal = (item) => {
        return item.price * item.quantity;
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
    };

    const handlePurchase = () => {
        // Lógica para finalizar la compra (puedes realizar acciones adicionales aquí)
        clearCart();
        setPurchaseCompleted(true);

        setTimeout(() => {
            setPurchaseCompleted(false);
            const confirmed = window.confirm('¿Desea volver a la página principal?');
            if (confirmed) {
            // Redirigir a la página de éxito
                navigate('/');
            }
        }, 1000);
        // Redirigir a la página de éxito
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            {purchaseCompleted && <p>¡Compra realizada con éxito!</p>}
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id}>
                            <p>Title: {item.title}</p>
                            <p>Price: ${item.price}</p>
                            <button onClick={() => incrementQuantity(item.id)}>+</button>
                            <p>Quantity: {item.quantity}</p>
                            <button onClick={() => decrementQuantity(item.id)}>-</button>
                            <p>Subtotal: ${calculateSubtotal(item)}</p>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <p>Total: ${calculateTotal()}</p>
                    <button onClick={handlePurchase}>Finalizar compra</button>
                </div>
            )}
        </div>
    );
};

export default Cart;

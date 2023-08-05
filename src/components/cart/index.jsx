import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import './styles.css';

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
        clearCart();
        setPurchaseCompleted(true);

        setTimeout(() => {
            setPurchaseCompleted(false);
            const confirmed = window.confirm('¿Desea volver a la página principal?');
            if (confirmed) {
                navigate('/');
            }
        }, 1000);
    };

    return (
        <>
            <h2 className='cart-title'>Shopping Cart</h2>
            {purchaseCompleted && <p>¡Compra realizada con éxito!</p>}
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className='cart-items'>
                    <div className='cart-cards'>
                        {cartItems.map((item) => (
                            <div key={item.id} className='cart-product'>
                                <h4 className='cart-product-item'>{item.title}</h4>
                                <p className='cart-product-item'>Price: ${item.price}</p>
                                <p className='cart-product-item'>Subtotal: ${calculateSubtotal(item)}</p>
                                <div className='cart-quantity'>
                                    <button onClick={() => incrementQuantity(item.id)}>+</button>
                                    <p className='cart-quantity-p'>Quantity: {item.quantity}</p>
                                    <button onClick={() => decrementQuantity(item.id)}>-</button>
                                </div>
                                    <button className='cart-product-button' onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <div className='cart-buy'>
                        <h3>Total: ${calculateTotal()}</h3>
                        <button onClick={handlePurchase}>Finalizar compra</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cart;

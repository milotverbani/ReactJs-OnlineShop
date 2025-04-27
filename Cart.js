import React from 'react';
import Navi from './Navi';
import { useLocalStorage } from '@uidotdev/usehooks';

function Cart() {
    const [cart, setCart] = useLocalStorage('cart', []);
    const [dashboard, setDashboard] = useLocalStorage('dashboard', []);
    const [Loggin, setLoggin] = useLocalStorage('user', {});

    const increment = (id) => {
        setCart(prevCart => prevCart.map(item =>
            item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        ));
    };

    const decrement = (id) => {
        setCart(prevCart => prevCart
            .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
            .filter(item => item.quantity > 0) 
        );
    };

 
    const calculateTotalPrice = (price, quantity) => {
        return (price * quantity).toFixed(2); 
    };

    const Checkout = () => {
        const order = {
            user: Loggin,
            items: cart.filter(item => item?.id)
        };
        setDashboard([...dashboard, order]);
        setCart([]);
        alert('Thanks for your purchase!');
    };

    return (
        <>
            <Navi />
            <h1 className="text-3xl text-center">Cart</h1>
            <div className="container mx-auto mt-5">
                {cart.length > 0 ? cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-4 border-b">
                        <h4 className="text-lg">{item.title.substring(0, 10)}</h4>
                        <h4 className="text-lg">${calculateTotalPrice(item.price, item.quantity || 1)}</h4>
                        <div className="flex items-center gap-2">
                            <button
                                className="px-3 py-1 bg-red-500 text-white rounded"
                                onClick={() => decrement(item.id)}
                            >-</button>
                            <span className="text-lg font-bold">{item.quantity || 1}</span>
                            <button
                                className="px-3 py-1 bg-green-500 text-white rounded"
                                onClick={() => increment(item.id)}
                            >+</button>
                        </div>
                    </div>
                )) : <p className="text-center">Your cart is empty.</p>}
            </div>

            {cart.length > 0 && (
                <div className='flex items-end justify-center relative left-10 pb-10 text-xl font-bold mr-20 mt-10'>
                    ${cart.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2)}
                </div>
            )}

               
            {cart.length > 0 && Loggin?.email ? (
                <div className='flex justify-center'>
                    <button onClick={Checkout} className="px-3 py-1 bg-green-500 text-white rounded">CheckOut</button>
                </div>
            ) : (
                cart.length > 0 && <p className="text-center mt-4">Please <a href="/login" className="text-blue-500">Login</a> or <a href="/register" className="text-blue-500">Register</a> to checkout.</p>
            )}
        </>
    );
}

export default Cart;

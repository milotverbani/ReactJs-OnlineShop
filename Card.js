import { useLocalStorage } from '@uidotdev/usehooks';
import React from 'react';

function Card({ id, image, price, title }) {
  const [cart, setCart] = useLocalStorage('cart', []);

  const AddtoCart = () => {
    setCart(prevCart => {
      
      const existingItem = prevCart.find(item => item.id === id);
      if (existingItem) {
       
        return prevCart;
      }
     
      return [...prevCart, { id, image, price, title, quantity: 1 }];
    });
  };

  return (
    <div className="mt-20 w-[400px] bg-stone-50 border drop-shadow-xl border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="p-8 w-52 h-[200px] rounded-t-lg" src={image} alt="product" />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h1>
        </a>

        <div className="flex items-center justify-between mt-10">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">${price}</span>
          <button 
            onClick={AddtoCart} 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
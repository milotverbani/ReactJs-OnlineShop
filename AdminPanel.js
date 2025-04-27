import React, { useEffect, useState } from 'react'
import Naviadmin from './Naviadmin'
import { useLocalStorage } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';


function AdminPanel() {
     const [users, setUsers] = useLocalStorage('users', []); 
        const [orders, setOrders] = useLocalStorage('dashboard', []); 
        const [userCount, setUserCount] = useState(0);
        const [totalProductsSold, setTotalProductsSold] = useState(0);
        const [totalRevenue, setTotalRevenue] = useState(0);
        const navigate = useNavigate();
        
    
        useEffect(() => {

            setUserCount(users.length); 
    
            let productCount = 0;
            let revenue = 0;
    
            orders.map(order => {
                order.items.forEach(item => {
                    productCount += item.quantity; 
                    revenue += item.price * item.quantity; 
                });
            });
    
            setTotalProductsSold(productCount);
            setTotalRevenue(revenue);
        }, [users, orders]);
    
  return (
    <>
    <Naviadmin/>
    <div className="fixed left-[70px]  right-0 top-[150px] p-6 grid grid-cols-3 gap-6">
                
                <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-bold">👥 Users Registered</h2>
                    <p className="text-2xl mt-2">{userCount}</p>
                </div>

                
                <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-bold">📦 Products Sold</h2>
                    <p className="text-2xl mt-2">{totalProductsSold}</p>
                </div>

                
                <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-lg text-center">
                    <h2 className="text-xl font-bold">💰 Total Revenue</h2>
                    <p className="text-2xl mt-2">${totalRevenue.toFixed(2)}</p>
                </div>
            </div>
    </>
    
  )
}

export default AdminPanel
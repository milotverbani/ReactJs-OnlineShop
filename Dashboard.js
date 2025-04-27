import React, { useEffect, useState } from 'react';
import Navi from './Navi';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [Loggin, setLoggin] = useLocalStorage('user', {});
    const [Dashboard, setdashboard] = useLocalStorage('dashboard', []);
    const [Myorders, setMyorders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!Loggin?.email) {
            navigate('/Login');
        } else {
            const newOrders = Dashboard.filter(order => order?.user?.email === Loggin.email);
            if (JSON.stringify(newOrders) !== JSON.stringify(Myorders)) {
                setMyorders(newOrders);
            }
        }
    }, [Loggin, Dashboard, navigate]);

    
    const totalPrice = Myorders.reduce((acc, order) => {
        return acc + order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, 0);

    return (
        <>
            <Navi />
            <div className="container mx-auto mt-8 p-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Orders</h2>
                {Myorders.length > 0 ? (
                    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                        <table className="w-full border-collapse">
                            <thead>
                               <tr className="bg-gray-100 text-gray-700">
                                    <th className="px-6 py-3 text-left text-sm font-medium">Users</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium">Products</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium">Image</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium">Quantity</th>
                                    <th className="px-6 py-3 text-left text-sm font-medium">Price</th>
                                </tr>
                            </thead>
                    <tbody>
                                {Myorders.map((order, index) => (
                                    <tr key={order.id || index} className="border-b">
                                        <td className="px-6 py-4 text-gray-800">{order.user?.name}</td>
                                        <td className="px-6 py-4">
                                            <ul className="list-disc list-inside text-gray-700">
                                          {order.items.map((item, itemIndex) => (
                                                    <li key={item.id || itemIndex} className="py-1">
                                                        {item.title}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="px-6 py-4">
                                            <ul className="flex flex-col gap-2">
                                                {order.items.map((item, itemIndex) => (
                                                    <li key={item.id || itemIndex}>
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.title} 
                                                            className="w-16 h-16 rounded-lg shadow-md object-cover"
                                                        />
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="px-6 py-4">
                                            <ul className="text-gray-700">
                                                {order.items.map((item, itemIndex) => (
                                                    <li key={item.id || itemIndex} className="py-1">
                                                        {item.quantity}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-green-600">
                                            <ul>
                                                {order.items.map((item, itemIndex) => (
                                                    <li key={item.id || itemIndex} className="py-1">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                    </tr>
                                ))}
                               
                                <tr className="bg-gray-200 font-bold text-gray-800">
                                    <td colSpan="4" className="px-6 py-4 text-right">Total:</td>
                                    <td className="px-6 py-4 text-green-700">${totalPrice.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500">You have no orders yet.</p>
                )}
            </div>
        </>
    );
}

export default Dashboard;

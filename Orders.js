import React, { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import Naviadmin from "./Naviadmin";

function Orders() {
  const [Dashboard, setDashboard] = useLocalStorage("dashboard", []);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    let revenue = 0;
    let productCount = 0;

    Dashboard.map(order => {
      order.items.map(item => {
        productCount += item.quantity;
        revenue += item.price * item.quantity;
      });
    });

    setTotalRevenue(revenue);
    setTotalProducts(productCount);
  }, [Dashboard]);
    const filterorders = (min , max) => {}
  return (
    <>
    <Naviadmin/>
  

    <button>0</button>
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📦 All Orders</h1>

    
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold">📦 Products Sold</h2>
          <p className="text-2xl mt-2">{totalProducts}</p>
        </div>

        <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold">💰 Total Revenue</h2>
          <p className="text-2xl mt-2">${totalRevenue.toFixed(2)}</p>
        </div>
      </div>

    
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 border">User</th>
              <th className="p-3 border">Product</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Quantity</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {Dashboard.length > 0 ? (
              Dashboard.map((order, index) => (
                order.items.map((item, itemIndex) => (
                  <tr key={`${index}-${itemIndex}`} className="text-center border">
                    <td className="p-3 border">{order.user?.name || "Unknown"}</td>
                    <td className="p-3 border">{item.title}</td>
                    <td className="p-3 border">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mx-auto rounded" />
                    </td>
                    <td className="p-3 border">{item.quantity}</td>
                    <td className="p-3 border">${item.price.toFixed(2)}</td>
                    <td className="p-3 border">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}

export default Orders;

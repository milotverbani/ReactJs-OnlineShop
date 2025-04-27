import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '@uidotdev/usehooks';

function Naviadmin() {
   
    return (
        <>
            
            <header className="flex  w-full h-24 bg-slate-700 text-white justify-around items-center p-4">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <div className="flex gap-[50px]">
                    <Link to='/AdminPanel'>Home</Link>
                    <Link to="/Orders" className="text-white hover:text-gray-300"> Orders</Link>
                    <Link to="/Users" className="text-white hover:text-gray-300"> Users</Link>
                    <Link to="/" className="text-white hover:text-gray-300"> Go to Website</Link>
                </div>
            </header>

           
        </>
    );
}

export default Naviadmin;

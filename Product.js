import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import Navi from './Navi';

function Product() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const itemsPerPage = 6;

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                if (response.status === 200) {
                    setProducts(response.data);
                    const uniqueCategories = [...new Set(response.data.map(item => item.category))];
                    setCategories(uniqueCategories);
                }
            });
    }, []);

    
    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(product => product.category === selectedCategory);

    
    const indexOfLastItem = currentPage * itemsPerPage; 
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;  
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem); 
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); 

    return (
        <>
            <Navi />
            <div className='overflow-hidden'>
                <h1 className='text-3xl text-center'>Products</h1>

            
                <div className='flex justify-center my-4'>
                    <select 
                        className='px-4 py-2 border rounded' 
                        value={selectedCategory} 
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setCurrentPage(1); 
                        }}
                    >
                        <option value="all">All</option>
                        {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div className='grid grid-cols-3 container mx-auto ml-20'>
                    {currentProducts.length > 0 ? (
                        currentProducts.map(product => <Card key={product.id} {...product} />)
                    ) : (
                        <p className="text-center col-span-3 text-gray-500">No products found.</p>
                    )}
                </div>

                
                {filteredProducts.length > 0 && (
                    <div className='flex justify-center mt-4'>
                        <button 
                            className='px-4 py-2 mx-1 border rounded' 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                            disabled={currentPage === 1}
                        >
                             Prev
                        </button>
                        <span className='px-4 py-2'>{currentPage} / {totalPages}</span>
                        <button 
                            className='px-4 py-2 mx-1 border rounded' 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                            disabled={currentPage === totalPages}
                        >
                            Next 
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default Product;

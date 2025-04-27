import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'


function Products() {
    const [Products , Setproducts] = useState()
    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
        .then(response => {
            if(response.status === 200) {
                Setproducts(response.data.slice( 0 , 3))
            }
        })
    })
  return (
    <div>
        <h1 className='text-3xl text-center'>Products</h1>
        <Link to='/Product' className='absolute left-[1400px] top-[500px] text-blue-500'>View All Product--</Link>
        <div className='w-[1500px] relative left-10 h-3 bg-slate-500 mt-[50px]'></div>
        <div className='grid grid-cols-3 cointainer mx-auto ml-20'>
            {
                Products && Products.map(product => <Card key={product.id} {...product}/>)
            }
        </div>
    </div>

  )
}

export default Products
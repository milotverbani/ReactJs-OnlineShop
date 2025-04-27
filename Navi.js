import { useLocalStorage } from '@uidotdev/usehooks';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navi() {

  const navigate = useNavigate();
  const [Loggin, setLoggin] = useLocalStorage('user', {});
  const [cart] = useLocalStorage('cart', []); 

  const Logout = () => {
    if (Loggin?.email) {
      setLoggin({});
      navigate('/');
    }
  };

 
  const totalItemsInCart = cart.reduce((total, item) => total + (item.quantity ), 0);

  return (
    <>
      <header className='flex justify-around bg-zinc-900 items-center h-12 text-white'>
        <Link to='/Admin'>Milot Shop</Link>
        <div className='flex gap-3'>
          <Link to='/'>Home</Link>
          <Link to='/Product'>Products</Link>
          {/* Shfaq numrin e produkteve në karrocë */}
          <Link to='/Cart'>
            Cart ({totalItemsInCart})
          </Link>
          {
            (Loggin?.email) ? (
              <>
                <Link to='/Dashboard'>Dashboard</Link>
                <button onClick={Logout}>Logout</button>
                <Link to='/ChangePassword'>ChangePassword</Link>
              </>
            ) : (
              <>
                <Link to='/Login'>Login</Link>
                <Link to='/Register'>Register</Link>
              </>
            )
          }
        </div>
      </header>
    </>
  );
}

export default Navi;

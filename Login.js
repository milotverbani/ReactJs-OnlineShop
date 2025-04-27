import React, { useEffect } from 'react'
import Navi from './Navi'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useNavigate } from 'react-router-dom'

function Login() {
     const [users , setusers] = useLocalStorage('users' , [])
     const [Loggin , setLoggin] = useLocalStorage('user' , {})

      useEffect(()=> {
           if(Loggin?.email) {
            navigate('/')
           }
      }, [])
        const navigate = useNavigate()
        const Login =  e => {
            e.preventDefault()
    
            const data = e.target.elements
    
           
            const email = data['email'].value
            const password = data['password'].value
           
             const userexist = users.filter(u => (u.email === email) && (u.password === password))

             if(userexist.length) {
                 setLoggin(userexist[0])
                 navigate('/')
             } else {
                alert('invalid email or password')
             }
        }
  return (
    <>
        <Navi/>
        <div className="container mx-auto py-8">
    <h1 className="text-2xl font-bold mb-6 text-center">Login Form</h1>
    <form onSubmit={Login} className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
     
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="email" id="email" name="email" placeholder="john@example.com"/>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="password" id="password" name="password" placeholder="********"/>
      </div>
     
      <button
        className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        type="submit">Login</button>
    </form>
  </div>
    </>
  )
}

export default Login
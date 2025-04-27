import React, { useEffect } from 'react'
import Navi from './Navi'
import { useLocalStorage } from '@uidotdev/usehooks'
import { useNavigate } from 'react-router-dom'
 
function Register() {
    const [users, setUsers] = useLocalStorage('users', [])
    const [Loggin, setLoggin] = useLocalStorage('user', {})
    const navigate = useNavigate()

    useEffect(() => {
        if (Loggin?.email) {
            navigate('/')
        }
    }, [])

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return regex.test(password);
    }

    const Register = (e) => {
        e.preventDefault()

        const data = e.target.elements
        const name = data['name'].value
        const email = data['email'].value
        const password = data['password'].value
        const confirmpassword = data['confirmpassword'].value

        if (!validatePassword(password)) {
            alert("Password must be 6-16 characters long and include at least one uppercase letter, one number, and one special character.");
            return;
        }

        if (password !== confirmpassword) {
            alert('Passwords do not match!')
            return;
        }

        const user = { name, email, password }

        if (users.some(u => u.email === user.email)) {
            alert(`User with email ${user.email} already exists.`)
        } else {
            setUsers([...users, user])
            navigate('/Login')
        }
    }

    return (
        <>
            <Navi />
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>
                <form onSubmit={Register} className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text" id="name" name="name" placeholder="John Doe" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="email" id="email" name="email" placeholder="john@example.com" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="password" id="password" name="password" placeholder="********" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmpassword">Confirm Password</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="password" id="confirmpassword" name="confirmpassword" placeholder="********" required />
                    </div>
                    <button
                        className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                        type="submit">Register</button>
                </form>
            </div>
        </>
    )
}

export default Register

import React, { useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import Navi from './Navi';

function ProfileEdit() {
    const [users, setUsers] = useLocalStorage('users', []);
    const [Loggin, setLoggin] = useLocalStorage('user', {});
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        return regex.test(password);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();

        if (!validatePassword(newPassword)) {
            alert("Password must be 6-16 characters long and include at least one uppercase letter, one number, and one special character.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const updatedUsers = users.map(u => u.email === Loggin.email ? { ...u, password: newPassword } : u);
        setUsers(updatedUsers);
        setLoggin({ ...Loggin, password: newPassword });
        alert("Password updated successfully!");
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <>
        <Navi/>
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
            <form onSubmit={handlePasswordChange} className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">New Password</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="password" id="newPassword" name="newPassword" placeholder="********"
                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="password" id="confirmPassword" name="confirmPassword" placeholder="********"
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <button
                    className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                    type="submit">Update Password</button>
            </form>
        </div>
        </>
    );
}

export default ProfileEdit;
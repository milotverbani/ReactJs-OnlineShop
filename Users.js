import React, { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import Naviadmin from "./Naviadmin";

function Users() {
  const [users, setUsers] = useLocalStorage("users", []);

  return (
    <>
    <Naviadmin/>
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">👥 All Registered Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Password</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="text-center border">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.password}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No users found
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

export default Users;

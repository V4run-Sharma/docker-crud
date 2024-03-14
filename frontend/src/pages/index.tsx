import { use, useEffect, useState } from "react";

import axios from "axios";

import Card from "@/components/Card";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });

  //fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${apiUrl}/users`);
        setUsers(res.data.reverse());
      } catch (error) {
        console.log("Error fetching users", error);
      }
    };
    fetchUsers();
  }, [apiUrl]);

  //add user
  const handleCreateUser = async () => {
    try {
      const res = await axios.post(`${apiUrl}/users`, newUser);
      setUsers([res.data, ...users]);
      setNewUser({ name: "", email: "" });
    } catch (error) {
      console.log("Error adding user", error);
    }
  };

  //update user
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/users/${updateUser.id}`, {
        name: updateUser.name,
        email: updateUser.email,
      });
      setUpdateUser({ id: "", name: "", email: "" });
      setUsers(
        users.map((user) => {
          if (user.id === parseInt(updateUser.id)) {
            return { ...user, name: updateUser.name, email: updateUser.email };
          }
          return user;
        })
      );
    } catch (error) {
      console.log("Error updating user", error);
    }
  };

  //delete user
  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log("Error deleting user", error);
    }
  };

  return (
    <main className="flex min-h-screen gap-x-36 items-start justify-center px-24 py-24 bg-neutral-900">
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col items-center gap-y-4">
          <h1 className="text-2xl text-neutral-200 font-bold">Add User</h1>
          {/* Form */}
          <form onSubmit={handleCreateUser} className="flex flex-col gap-y-4">
            <input
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Name"
              className="px-4 py-2 rounded-md bg-neutral-800 text-neutral-200"
            />
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="Email"
              className="px-4 py-2 rounded-md bg-neutral-800 text-neutral-200"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white transition-all rounded-md font-semibold">
              Add
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center gap-y-4">
          <h1 className="text-2xl text-neutral-200 font-bold">Update User</h1>
          {/* Form */}
          <form onSubmit={handleUpdateUser} className="flex flex-col gap-y-4">
            <input
              type="text"
              value={updateUser.id}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, id: e.target.value })
              }
              placeholder="Id"
              className="px-4 py-2 rounded-md bg-neutral-800 text-neutral-200"
            />
            <input
              type="text"
              value={updateUser.name}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, name: e.target.value })
              }
              placeholder="Name"
              className="px-4 py-2 rounded-md bg-neutral-800 text-neutral-200"
            />
            <input
              type="email"
              value={updateUser.email}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, email: e.target.value })
              }
              placeholder="Email"
              className="px-4 py-2 rounded-md bg-neutral-800 text-neutral-200"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white transition-all rounded-md font-semibold">
              Add
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col gap-y-4 items-center">
        <h1 className="text-2xl text-neutral-200 font-bold">Users</h1>
        <div className="flex flex-col gap-y-4 gap-x-4 items-center max-h-[475px] overflow-y-scroll p-4 border-2 border-neutral-400 rounded-xl">
          {users.map((user) => (
            <div
              className="flex items-center w-[500px] gap-x-4 transition-all rounded-2xl"
              key={user.id}>
              <Card cardProps={user} />
              <div className="ml-auto flex gap-x-4">
                <button
                  onClick={handleDeleteUser.bind(null, user.id)}
                  className="text-white px-4 py-2 bg-red-700 hover:bg-red-800 transition-all rounded-md font-semibold">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

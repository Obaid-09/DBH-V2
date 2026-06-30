import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

const Users = () => {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {

        try {

            const res = await API.get(
                "/admin/users",
                {
                    withCredentials: true
                }
            );

            setUsers(res.data.data);

        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch users");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const changeRole = async (userId, role) => {

        try {

            await API.patch(
                `/admin/users/${userId}/role`,
                { role },
                {
                    withCredentials: true
                }
            );

            toast.success("Role updated");

            fetchUsers();

        } catch (error) {
            console.log(error);
            toast.error("Failed to update role");
        }
    };

    const removeUser = async (userId) => {

        const confirmDelete = window.confirm(
            "Delete this user?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(
                `/admin/users/${userId}`,
                {
                    withCredentials: true
                }
            );

            toast.success("User deleted");

            fetchUsers();

        } catch (error) {
            console.log(error);
            toast.error("Failed to delete user");
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow">

            <h1 className="text-3xl font-bold mb-8">
                Users
            </h1>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="py-4">Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Joined</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        users.map((user) => (

                            <tr
                                key={user._id}
                                className="border-b text-center"
                            >

                                <td className="py-5">
                                    {user.fullname}
                                </td>

                                <td>
                                    {user.email}
                                </td>

                                <td>
                                    <span
                                        className={`
                                            px-3 py-1 rounded-full
                                            ${user.role === "admin"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-700"
                                            }
                                        `}
                                    >
                                        {user.role}
                                    </span>
                                </td>

                                <td>
                                    {new Date(
                                        user.createdAt
                                    ).toLocaleDateString()}
                                </td>

                                <td className="space-x-3">

                                    {
                                        user.role === "user" ? (

                                            <button
                                                onClick={() =>
                                                    changeRole(
                                                        user._id,
                                                        "admin"
                                                    )
                                                }
                                                className="bg-green-500 text-white px-4 py-2 rounded"
                                            >
                                                Make Admin
                                            </button>

                                        ) : (

                                            <button
                                                onClick={() =>
                                                    changeRole(
                                                        user._id,
                                                        "user"
                                                    )
                                                }
                                                className="bg-yellow-500 text-white px-4 py-2 rounded"
                                            >
                                                Remove Admin
                                            </button>

                                        )
                                    }

                                    <button
                                        onClick={() =>
                                            removeUser(user._id)
                                        }
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
};

export default Users;
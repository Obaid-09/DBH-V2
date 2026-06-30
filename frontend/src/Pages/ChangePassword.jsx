import React, { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await API.post(
                "/users/change-password",
                {
                    oldPassword,
                    newPassword
                },
                {
                    withCredentials: true
                }
            );

            toast.success("Password Updated Successfully");
            navigate("/login");

        } catch (err) {

            toast.error(
                err?.response?.data?.message ||
                "Failed to update password"
            );
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <form
                onSubmit={handleSubmit}
                className='bg-white p-10 rounded-3xl shadow-lg w-[450px]'
            >

                <h1 className='text-3xl mb-8 text-center'>
                    Change Password
                </h1>

                <input
                    type="password"
                    placeholder="Current Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className='w-full border p-4 rounded-full mb-5'
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='w-full border p-4 rounded-full mb-5'
                />

                <button
                    className='w-full bg-[#C9A227] text-white py-4 rounded-full'
                >
                    Update Password
                </button>

            </form>
        </div>
    );
};

export default ChangePassword;
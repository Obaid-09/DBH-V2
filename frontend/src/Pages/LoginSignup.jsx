import React, { useState } from 'react';
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const LoginSignup = () => {

    const [state, setState] = useState("Login");
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({
                email,
                password
            });
            toast.success("Login Successful");
            navigate("/");
        }
        catch (err) {
            console.log(err);
            const message = err?.response?.data?.message;
            if (
                message?.toLowerCase().includes("password")
            ) {
                toast.error("Incorrect Password");
            }
            else {
                toast.error(message || "Login Failed");
            }
        }
    };
    return (
        <div className='min-h-screen bg-[#F8F6F2] flex justify-center items-center py-16 px-4'>

            <div className='w-full max-w-[500px] bg-white shadow-xl rounded-3xl p-10'>

                {/* Heading */}
                <div className='text-center mb-8'>
                    <p className='uppercase tracking-[4px] text-[#C9A227] text-sm'>
                        Welcome to
                    </p>

                    <h1 className='text-4xl font-serif text-[#111111] mt-2'>
                        Dubai Burqa House
                    </h1>

                    <div className='w-20 h-[3px] bg-[#C9A227] mx-auto mt-4 rounded-full'></div>
                </div>

                {/* Form Title */}
                <h2 className='text-3xl font-semibold text-center text-[#111111] mb-8'>
                    {state}
                </h2>

                {/* Inputs */}
                <div className='flex flex-col gap-5'>

                    {state === "Sign Up" && (
                        <input
                            type="text"
                            placeholder='Full Name'
                            className='border border-gray-300 rounded-full px-6 py-4 outline-none focus:border-[#C9A227]'
                        />
                    )}

                    {/* <input
                        type="email"
                        placeholder='Email Address'
                        className='border border-gray-300 rounded-full px-6 py-4 outline-none focus:border-[#C9A227]'
                    /> */}

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border border-gray-300 rounded-full px-6 py-4 outline-none focus:border-[#C9A227]'
                    />

                    {/* <input
                        type="password"
                        placeholder='Password'
                        className='border border-gray-300 rounded-full px-6 py-4 outline-none focus:border-[#C9A227]'
                    /> */}

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border border-gray-300 rounded-full px-6 py-4 outline-none focus:border-[#C9A227]'
                    />

                </div>

                {/* Button */}
                {/* <button className='w-full mt-8 py-4 bg-[#C9A227] text-white rounded-full font-semibold text-lg hover:bg-[#b08d1f] transition-all duration-300'>
                    {state === "Login" ? "Login" : "Create Account"}
                </button> */}
                <button
                    onClick={handleSubmit}
                    className='w-full mt-8 py-4 bg-[#C9A227] text-white rounded-full font-semibold text-lg hover:bg-[#b08d1f] transition-all duration-300'
                >
                    {state === "Login" ? "Login" : "Create Account"}
                </button>
                
                <div className='flex justify-end mt-2'>
                    <span
                        onClick={() => navigate('/change-password')}
                        className='text-sm text-[#C9A227] cursor-pointer hover:underline'
                    >
                        Forgot Password?
                    </span>
                </div>
                {/* Toggle */}
                <p className='text-center text-gray-600 mt-6'>

                    {state === "Login"
                        ? "Don't have an account?"
                        : "Already have an account?"}

                    <span
                        onClick={() =>
                            setState(state === "Login" ? "Sign Up" : "Login")
                        }
                        className='text-[#C9A227] font-semibold cursor-pointer ml-2'
                    >
                        {state === "Login" ? "Sign Up" : "Login"}
                    </span>

                </p>

                {/* Terms */}
                {state === "Sign Up" && (
                    <div className='flex items-start gap-3 mt-6'>
                        <input type='checkbox' className='mt-1 accent-[#C9A227]' />

                        <p className='text-sm text-gray-500'>
                            By continuing, I agree to the Terms & Conditions
                            and Privacy Policy.
                        </p>
                    </div>
                )}

            </div>

        </div>
    );
}

export default LoginSignup;

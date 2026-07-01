import React, { useState } from 'react';
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const LoginSignup = () => {

    const [state, setState] = useState("Login");

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);

    const { login, register } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (state === "Login") {
                await login({
                    email,
                    password
                });
                toast.success("Login Successful");
            }
            else {
                if (!avatar) {
                    return toast.error(
                        "Please select an avatar"
                    );
                }
                await register({
                    fullname: name,
                    username,
                    email,
                    password,
                    avatar
                });
                toast.success(
                    "Account Created Successfully"
                );
            }
            navigate("/");
        }
        catch (err) {
            const data = err.response?.data;

            if (typeof data === "string") {
                if (data.includes("Incorrect Password")) {
                    toast.error("Incorrect Password");
                } else if (data.includes("User not found")) {
                    toast.error("User not found");
                } else {
                    toast.error("Something went wrong");
                }
            } else {
                toast.error(data?.message || "Something went wrong");
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

                    <form onSubmit={handleSubmit}>

                        {state === "Sign Up" &&
                            <input
                                className='w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C9A227] transition-all duration-300'
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />
                        }

                        {state === "Sign Up" &&
                            <input
                                className='w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C9A227] transition-all duration-300'
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />
                        }

                        <input
                            className='w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C9A227] transition-all duration-300'
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <input
                            className='w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:border-[#C9A227] transition-all duration-300'
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        {state === "Sign Up" &&
                            <div className='border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#C9A227] transition-all duration-300'>
                                <label
                                    htmlFor='avatar'
                                    className='cursor-pointer'
                                >
                                    <div className='flex flex-col items-center gap-3'>
                                        <div className='w-16 h-16 rounded-full bg-[#F8F6F2] flex items-center justify-center text-2xl'>
                                            📷
                                        </div>
                                        <p className='text-gray-600'>
                                            {avatar
                                                ? avatar.name
                                                : "Upload Profile Picture"}
                                        </p>
                                        <span className='text-sm text-[#C9A227] font-medium'>
                                            Click to browse
                                        </span>
                                    </div>
                                </label>
                                <input
                                    id='avatar'
                                    type='file'
                                    accept='image/*'
                                    className='hidden'
                                    onChange={(e) =>
                                        setAvatar(e.target.files[0])
                                    }
                                />
                            </div>
                        }

                        <button
                            type="submit"
                            className='w-full mt-4 py-4 bg-[#C9A227] text-white rounded-xl font-semibold text-lg hover:bg-[#b08d1f] hover:shadow-lg transition-all duration-300'
                        >
                            {state === "Login" ? "Login" : "Create Account"}
                        </button>

                    </form>

                </div>

                {/* Button */}
                {/* <button className='w-full mt-8 py-4 bg-[#C9A227] text-white rounded-full font-semibold text-lg hover:bg-[#b08d1f] transition-all duration-300'>
                    {state === "Login" ? "Login" : "Create Account"}
                </button> */}
                {/* <button
                    onClick={handleSubmit}
                    className='w-full mt-8 py-4 bg-[#C9A227] text-white rounded-full font-semibold text-lg hover:bg-[#b08d1f] transition-all duration-300'
                >
                    {state === "Login" ? "Login" : "Create Account"}
                </button> */}
                
                <div className='flex justify-end mt-4'>
                    <span
                        onClick={() => navigate('/change-password')}
                        className='text-sm text-[#C9A227] cursor-pointer hover:underline font-medium'
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
                    <div className='flex items-start gap-3 mt-6 bg-[#F8F6F2] p-4 rounded-xl'>
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

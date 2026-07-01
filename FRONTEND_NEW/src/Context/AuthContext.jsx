import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const register = async (formData) => {

        const data = new FormData();

        data.append("fullname", formData.fullname);
        data.append("username", formData.username);
        data.append("email", formData.email);
        data.append("password", formData.password);

        // Mandatory avatar
        data.append("avatar", formData.avatar);

        const res = await API.post(
            "/users/register",
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return res.data;
    };

    const login = async (formData) => {

        const res = await API.post(
            "/users/login",
            formData
        );

        setUser(res.data.data.user);

        localStorage.setItem(
            "user",
            JSON.stringify(res.data.data.user)
        );
    };

    const logout = async () => {

        await API.post("/users/logout");

        setUser(null);

        localStorage.removeItem("user");
    };

    useEffect(() => {

        const storedUser =
            localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
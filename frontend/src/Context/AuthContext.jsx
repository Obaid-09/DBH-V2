import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = async(formData)=>{
        const res = await API.post(
            "/users/login",
            formData
        );
        setUser(res.data.data.user);

        localStorage.setItem(
            "user",
            JSON.stringify(res.data.data.user)
        );
    }

    const logout = async()=>{

        await API.post("/users/logout");

        setUser(null);

        localStorage.removeItem("user");
    }

    useEffect(()=>{

        const storedUser =
            localStorage.getItem("user");

        if(storedUser){
            setUser(JSON.parse(storedUser));
        }

    },[])

    return(
        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
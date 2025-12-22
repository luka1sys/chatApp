import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import api from "../components/api/api";





const authContext = createContext();
export const useAuth = () => useContext(authContext)
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user) {
            getUsers();
        }
    }, [user]);
    useEffect(() => {
        const autoLogin = async () => {
            try {
                const res = await api.post(
                    '/auth/auto-login',
                    {},
                    { withCredentials: true }
                );

                setUser(res.data.user);
            } catch (err) {
                setUser(null);
            }
        };

        autoLogin();
    }, []);
    const signup = async (userData) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),

            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.newUser);
            }
        } catch (err) {
            console.error("Signup error:", err);
        }

    }

    const login = async (credentials) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
                credentials: 'include'


            });
            if (response.ok) {

                const data = await response.json();
                setUser(data.user);



            }

        } catch (err) {
            console.error("Login error:", err);
        }
    }
    console.log("User after login:", user);


    const getUsers = async () => {
        try {
            const res = await api.get('/auth');
            setUsers(res.data.users);

        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }






    return (
        <authContext.Provider value={{ user, signup, login, users }}>
            {children}
        </authContext.Provider>
    )

}
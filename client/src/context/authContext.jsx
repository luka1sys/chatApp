import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import api from "../components/api/api";
import { toast} from "react-toastify";





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
        const toastId = toast.loading('signing...');
        try {
            const response = await fetch(`/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),

            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            setUser(data.user);

            toast.update(toastId, {
                render: 'Added successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })
        } catch (err) {

            toast.update(toastId, {
                render: err.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }

    }

    const login = async (credentials) => {
        const toastId = toast.loading('logining...');
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
                credentials: 'include'


            });



            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);

            }
            console.log(data.message);

            setUser(data);
            toast.update(toastId, {
                render: 'Login successfully',
                type: 'success',
                isLoading: false,
                autoClose: 2000
            })

        } catch (err) {
            toast.update(toastId, {
                render: err.message,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
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
"use client"
import { createContext, useEffect } from "react";
import { useState } from "react";


interface UserContextType {
    value: User[];
    setUsers: (users: User[]) => void;
}
export const Usercontext = createContext<UserContextType>({
    value: [],
    setUsers: () => { }
});

const getLocalStorage = (key: string, initialValue: any) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
}


export function UsersProvider({ children }: { children: React.ReactNode }) {
    const [value, setValue] = useState<User[]>([]);
    const setUsers = (users: User[]) => {
        localStorage.setItem('users', JSON.stringify(users));
        setValue(users)
    }

    useEffect(() => {
        const storedUsers = getLocalStorage("users", []);
        setValue(storedUsers);
      }, []);

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [value]);

    const handleBeforeUnload = () => {
        localStorage.setItem('users', JSON.stringify(value));
    };



    return (
        <Usercontext.Provider value={{ value, setUsers }}>
            {children}
        </Usercontext.Provider>
    )

}

interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    };
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}


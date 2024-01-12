import React, { createContext, useContext } from 'react';
import useUser from '../hooks/useUser';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const user = useUser();

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);

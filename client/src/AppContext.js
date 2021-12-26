import React, { useState, createContext } from 'react';

export const AppContext = createContext({
    user: {},
    addUser: () => {},
});

export const AppContextProvider = props => {
    const [user, setUser] = useState({
        id: 0,
        name: "",
        email: "",
        type: 0,
        password: "",
    });

    const addUser = (user) => {
        setUser(user);
    }

    return (
        <AppContext.Provider value={{
            user: user,
            addUser: addUser,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};
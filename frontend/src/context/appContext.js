import { useState,createContext } from "react";


const Context = createContext(null);


const ContextProvider = ({children}) => {
    const [ activeBook, setActiveBook ] = useState(null);

    return (
        <Context.Provider 
          value={{
            activeBook,
            setActiveBook
          }}>
            {children}
        </Context.Provider>
    )
}

export { Context, ContextProvider };
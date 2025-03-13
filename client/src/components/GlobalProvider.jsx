import { useState, createContext, useContext } from 'react';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <GlobalContext.Provider value={{isLoading, setIsLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };

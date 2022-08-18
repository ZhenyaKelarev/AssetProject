import { createContext } from 'react';
import { useState } from 'react';

const FavoriteContext = createContext(null);

const FavoriteProvider = ({ children }) => {
  const [favoritesData, setFavoritesData] = useState([]);
  return (
    <FavoriteContext.Provider value={{ favoritesData, setFavoritesData }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export { FavoriteProvider, FavoriteContext };

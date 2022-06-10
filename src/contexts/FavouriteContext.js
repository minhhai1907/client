import React, { useReducer, createContext } from "react";
import apiService from "../app/apiService";

export const FavouriteContext = createContext();

const initialState = {
  favourite: [],
  };
const favouriteReducer = (state, action) => {
  console.log(state, action)
  console.log(state.favourite)
  let product;
  switch (action.type) {
    case "ADD":
      product = action.payload;
        return { ...state, favourite: [...state.favourite, { ...product, quantity: 1 }] };
   
    case "DEL_POST": 
      return {
        ...state,
        favourite: state.favourite.filter((product) => product._id !== action.payload),
      };

    case "CLEAR":
      return { ...state, favourite: [] };

    default:
      return state;
  }
};

function FavouriteContextProvider({ children }) {
  const [state, dispatch] = useReducer(favouriteReducer, initialState);


  return (
    <FavouriteContext.Provider
      value={{
        favouritePosts: state.favourite,
        dispatch,
       
      
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
}

export default FavouriteContextProvider;

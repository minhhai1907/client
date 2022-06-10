import { FavouriteContext } from "../contexts/FavouriteContext";
import { useContext } from "react";

function useFavouriteContext() {
  return useContext(FavouriteContext);
}

export default useFavouriteContext;

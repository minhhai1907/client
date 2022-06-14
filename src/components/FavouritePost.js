import { Badge, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import useFavouriteContext  from "../hooks/useFavouriteContext";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



const WidgetStyle = styled(RouterLink)(({ theme }) => ({
  color: "#fff",
  cursor: "pointer",
}));

function FavouritePost() {
  const  {favouritePosts}  = useFavouriteContext();
  const totalItems = favouritePosts.reduce(
    (acc, post) => acc + post.quantity,
    0
  );
  return (   
    <WidgetStyle to="/user/favourite" > 
      <Badge badgeContent={totalItems} color="error">
      <FavoriteBorderIcon />
      </Badge>
    </WidgetStyle>
  );
}

export default FavouritePost;

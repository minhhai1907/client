import { Badge, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

import { Link as RouterLink } from "react-router-dom";
import useFavouriteContext  from "../hooks/useFavouriteContext";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



const WidgetStyle = styled(RouterLink)(({ theme }) => ({
  // zIndex: 999,
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "center",
  // position: "fixed",
  // right: "20px",
  // top: "100px",
  // height: "40px",
  // width: "40px",
  // padding: "8px",
  // backgroundColor: "#fff",
  // borderRadius: "50%",
  color: "#fff",
  // color: theme.palette.text.primary,
  cursor: "pointer",
}));

function FavouritePost() {
  const  {favouritePosts}  = useFavouriteContext();
  console.log(favouritePosts)
  const totalItems = favouritePosts.reduce(
    (acc, post) => acc + post.quantity,
    0
  );
  console.log(totalItems)
  return (
    
    <WidgetStyle to="/user/favourite" > 
      <Badge badgeContent={totalItems} color="error">
      <FavoriteBorderIcon />
      </Badge>
        {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={2} color="error">
                <FavoriteBorderIcon /> 
                 <FavouritePost/>
              </Badge>
            </IconButton> */}
    
    </WidgetStyle>
  );
}

export default FavouritePost;

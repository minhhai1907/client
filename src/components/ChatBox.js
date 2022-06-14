import { Badge, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import useFavouriteContext  from "../hooks/useFavouriteContext";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';


const WidgetStyle = styled(RouterLink)(({ theme }) => ({
  color: "#fff",
  cursor: "pointer",
}));

function ChatBox() {
  const  {favouritePosts}  = useFavouriteContext();
  console.log(favouritePosts)
  const totalItems = favouritePosts.reduce(
    (acc, post) => acc + post.quantity,0);

  return (
    <WidgetStyle to="/user/notification" > 
      <Badge badgeContent={totalItems} color="error">
      <NotificationsNoneIcon />
      </Badge>
    </WidgetStyle>
  );
}

export default ChatBox;

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button  
} from "@mui/material";
import React from "react";
import useFavouriteContext from "../hooks/useFavouriteContext";
import { fCurrency } from "../utils/NumberFormat";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";

function FavouritePostList() {
  const { favouritePosts, dispatch } = useFavouriteContext();
  const navigate=useNavigate();
  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>
              <Button
              onClick={() => dispatch({ type: "CLEAR" })}
              variant="outline"
              size="small"
            >
              clear
               </Button>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {favouritePosts.map(({ _id, title, price, image }) => (
              <TableRow key={_id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>    
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: "hidden",
                        display: "flex",
                        width:70,
                        height: 70,
                        mr: "5px",
      
                      }}                  
                    >                   
                      <img
                        src={image}
                        alt="post"
                        width="100%"
                        height="100%"
                        onClick={() => navigate(`/posts/${_id}`)}  
                        style={{cursor:"pointer"}}                   
                      />                 
                    </Box>                   
                  </Box>
                </TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{fCurrency(price)}</TableCell>                            
                <TableCell>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() =>
                      dispatch({ type: "DEL_POST", payload: _id })
                    }
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>   
    </Box>
  );
}
export default FavouritePostList;

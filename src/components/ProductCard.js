import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack,CardActions } from "@mui/material";
import { fCurrency } from "../utils/NumberFormat";
import { useNavigate } from "react-router-dom";
import useFavouriteContext from "../hooks/useFavouriteContext";
import FavoriteIcon from '@mui/icons-material/Favorite';

function ProductCard({ product }) {
 
  const navigate = useNavigate();
  const {dispatch} = useFavouriteContext();

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/posts/${product._id}`)}>
        <CardMedia
          component="img"
          height="150"
          image={product.image}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="body" component="div" noWrap>
            {product.title}
          </Typography>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            justifyContent="flex-end"
          >      
            <Typography variant="body2" color="text.secondary">
              {fCurrency(product.price)}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      {/* <CardActions  > */}
        <Typography display="flex" justifyContent="flex-end" sx={{mx:1}}>
        <FavoriteIcon  onClick={() => dispatch({ type: "ADD", payload: product })} 
        style={{
          cursor:"pointer",
          color:"grey"
          }}/>
        {/* < FavoriteIcon  onClick={() => dispatch({ type: "DEL_POST", payload:product._id })} 
        style={{cursor:"pointer", color:"grey"}} /> */}
        </Typography>
      {/* </CardActions> */}
    </Card>
  );
}

export default ProductCard;

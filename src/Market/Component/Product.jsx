import React from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { Link } from "react-router-dom";

const Product = ({ item }) => {
  console.log(item);

  // Fallback image if the image_url array is empty or not valid
  const defaultImage =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/800px-No_image_available.svg.png"; // Placeholder image URL
  const productImage =
    item.image_url.length > 0 ? item.image_url[0] : defaultImage;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: 2,
          transition: "0.3s",
          "&:hover": { boxShadow: 6 },
        }}
      >
        <CardMedia
          component="img"
          alt={item.title}
          src={
            item.image_url.length > 0
              ? "http://localhost:3000/" + productImage
              : defaultImage
          }
          sx={{
            height: 200,
            objectFit: "cover",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
          }}
        />
        <CardContent>
          <Typography variant="h6" color="secondary" gutterBottom>
            {item.title}
          </Typography>
          <Typography variant="h5" fontWeight={700} color="primary">
            Tk {item.price}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 2,
            }}
            gutterBottom
          >
            {item.description}
          </Typography>
          <Typography variant="body2" fontWeight={700} color="initial">
            Status : {item.status}
          </Typography>
        </CardContent>
        <Box display="flex" padding={2} justifyContent="space-between">
          <IconButton sx={{ color: "primary.main" }}>
            <BookmarkAddIcon />
          </IconButton>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/market/individualproduct/${item.id}`}
            sx={{
              borderRadius: 1,
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            View
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default Product;

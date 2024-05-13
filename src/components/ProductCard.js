import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { IconButton, Link } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import axios from 'axios';
import ProductModal from './ProductModal';
import { useAuth } from '../AuthContext';
import Barcode from './Barcode';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_API_URL;

const ProductCard = ({ product }) => {
  const { id, title, price, compare_price, image, barcode } = product;
  const [showAllDescription, setShowAllDescription] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();

  const handleEdit = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const description = product?.description?.slice(0, 202);
  const isDescriptionTruncated = product?.description?.length > 202;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${REACT_APP_BACKEND_URL}/product/${id}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      toast.success('Producto eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };


  const createMarkup = (html) => {
    return { __html: html };
  };

  const toggleDescription = () => {
    setShowAllDescription(!showAllDescription);
  };


  return (
    <Card sx={{ maxWidth: 345, }}>
      <Stack
        direction="colum"
        justifyContent="center"
        alignItems="center"
        sx={{ ml: 3 }}
      >
        <Barcode barcode={barcode} />
      </Stack>
      <CardContent sx={{ minHeight: 315 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={createMarkup(showAllDescription ? product.description : description)} />
        {isDescriptionTruncated && (
          <Link onClick={toggleDescription} color="primary">
            {showAllDescription ? 'Ver menos...' : 'Ver más...'}
          </Link>
        )}
      </CardContent>
      <CardActions>
        <Typography variant="body2" color="text.secondary" >
          Precio: ${price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Precio anterior: ${compare_price}
        </Typography>
        <IconButton onClick={handleDelete} aria-label="eliminar producto">
          <Delete />
        </IconButton>
        <IconButton onClick={handleEdit} aria-label="editar producto">
          <ProductModal open={openModal} onClose={handleCloseModal} product={product} />
          <Edit />
        </IconButton>
      </CardActions>

    </Card>
  );
};

export default ProductCard;

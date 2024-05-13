import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_API_URL;

const ProductModal = ({ open, onClose, productId, product }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [comparePrice, setComparePrice] = useState(0);
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      updateData(productId);
    } else {
      setTitle('');
      setDescription('');
      setPrice(0);
      setComparePrice(0);
    }
  }, [productId]);

  const updateData = async () => {
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
    setComparePrice(product.compare_price);

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const productData = {
      title,
      description,
      price,
      compare_price: comparePrice,
    };
    try {
      if (productId) {
        const responseUpdate = await axios.put(`${REACT_APP_BACKEND_URL}/product/${productId}`, productData, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        if (responseUpdate) {
          toast.success('Producto actualizado');
        }
      } else {
        const responseCreate = await axios.post(`${REACT_APP_BACKEND_URL}/product`, productData, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
        if (responseCreate) {
          toast.success('Producto Creado correctamente');
        }
      }
      // navigate('/login');
      onClose();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h5">{productId ? 'Editar Producto' : 'Agregar Producto'}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Título" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth margin="normal" />
          <TextField label="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline margin="normal" />
          <TextField label="Precio" type="number" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth margin="normal" />
          <TextField label="Precio de comparación" type="number" value={comparePrice} onChange={(e) => setComparePrice(e.target.value)} fullWidth margin="normal" />
          <Button type="submit" variant="contained" color="primary" fullWidth>{productId ? 'Guardar Cambios' : 'Agregar Producto'}</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ProductModal;

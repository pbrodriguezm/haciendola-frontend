import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Stack, TextField, Divider, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useAuth } from '../../AuthContext';
import './style.css';
import ProductsBar from '../../components/ProductsBar';
import ProductCard from '../../components/ProductCard';
import axios from 'axios';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_API_URL;

const Products = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${REACT_APP_BACKEND_URL}/product`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      toast.warning('Error al obtener los productos');
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchProducts();
    }
  }, [isAuthenticated, navigate]);

  // Función para filtrar los productos por título
  const filteredProducts = products.filter(product =>
    product?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <Stack direction='column' spacing={2}>
      <ProductsBar user={user} product={filteredProducts} />

      <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ p: 1 }}>
        <TextField
          label="Buscar productos por título"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          variant="outlined"
        />

        <Typography variant="caption" display="block" gutterBottom>
          {searchTerm === '' ?
            <>Mostrando un total de {products.length} productos.</>
            :
            <>Resultados de la búsqueda: {filteredProducts.length} productos</>
          }
        </Typography>

      </Stack>
      <Divider />
      <Grid container spacing={3} sx={{ p: '12px' }}>
        {/* Mostrar todos los productos si searchTerm está vacío */}
        {searchTerm === '' ? (
          products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        ) : (
          // Mostrar productos filtrados si searchTerm no está vacío
          filteredProducts.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Stack >
  );
};

export default Products;

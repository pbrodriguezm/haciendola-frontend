import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Grid, Card, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { useAuth } from '../../AuthContext';
import PasswordRecoveryModal from '../../components/PasswordRecoveryModal';
import './style.css';


const REACT_APP_BACKEND_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/products');
    } else {
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/auth/login`, {
        username: username,
        password: password
      });
      const { data } = response;
      if (data) {
        await login(data);
        toast.success('Credenciales correctas... Bienvenido')
        navigate('/products');

      }
    } catch (error) {
      toast.error('Error')
    }
  };

  return (
    <Stack className="login-container">
      <Card className="login-card">
        <Typography variant="h4" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Usuario"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contraseña"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Iniciar Sesión
              </Button>
            </Grid>
            <Grid item xs={12}>
              {/* Enlace para abrir el modal de recuperación de contraseña */}
              <Button
                fullWidth
                color="primary"
                onClick={() => setOpenModal(true)}
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
      <PasswordRecoveryModal open={openModal} onClose={() => setOpenModal(false)} />
    </Stack>
  );
};

export default Login;
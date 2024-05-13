import React, { useState } from 'react';
import { Modal, TextField, Button, Typography, Stack, Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../AuthContext';

const REACT_APP_BACKEND_URL = process.env.REACT_APP_API_URL;

const UserModal = ({ isOpen, onClose, user: modalUser }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: modalUser ? modalUser.username : '',
    password: modalUser ? modalUser.password : '',
    name: modalUser ? modalUser.name : '',
    email: modalUser ? modalUser.email : '',
    number: modalUser ? modalUser.number : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalUser.username) {
        // Editar usuario existente
        await axios.put(`${REACT_APP_BACKEND_URL}/users/${user.username}`, formData, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
      } else {
        // Crear nuevo usuario
        await axios.post(`${REACT_APP_BACKEND_URL}/users`, formData, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        });
      }
      toast.success('Se guardo correctamente')
      onClose();
    } catch (error) {
      toast.error('Problemas al guardar.')
      console.error('Error al guardar usuario:', error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>{user ? 'Editar Usuario' : 'Agregar Usuario'}</Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Nombre de usuario"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              fullWidth
              required
            />
            <TextField
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Correo electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              fullWidth
              required
            />
            <TextField
              label="Número de teléfono"
              name="number"
              value={formData.number}
              onChange={handleChange}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary">
              {user ? 'Guardar Cambios' : 'Crear Usuario'}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default UserModal;

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';

const PasswordRecoveryModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Recuperar Contraseña</DialogTitle>
      <DialogContent>
        <Typography>
          Ingresa tu usuario para recuperar tu contraseña.
        </Typography>
        <TextField
          label="Usuario"
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" color="primary">Recuperar por Whatsapp</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordRecoveryModal;

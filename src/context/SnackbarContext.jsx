import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackbarContext = createContext();

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info', // 'error', 'warning', 'info', 'success'
    duration: 6000,
  });

  const showSnackbar = (message, severity = 'info', duration = 6000) => {
    setSnackbar({
      open: true,
      message,
      severity,
      duration,
    });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false,
    }));
  };

  const showSuccess = (message, duration) => showSnackbar(message, 'success', duration);
  const showError = (message, duration) => showSnackbar(message, 'error', duration);
  const showWarning = (message, duration) => showSnackbar(message, 'warning', duration);
  const showInfo = (message, duration) => showSnackbar(message, 'info', duration);

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        hideSnackbar,
      }}
    >
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.duration}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
          onClose={hideSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}; 
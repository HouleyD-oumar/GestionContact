'use client';

import { toast, ToastPosition, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseConfig: ToastOptions = {
  position: 'bottom-right' as ToastPosition,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  className: 'backdrop-blur-sm',
};

export const showToast = {
  success: (message: string) => {
    toast.dismiss();
    toast.success(message, {
      ...baseConfig,
      style: {
        background: 'rgba(220, 252, 231, 0.9)',
        borderLeft: '4px solid #22c55e',
        color: '#166534'
      }
    });
  },
  error: (message: string) => {
    toast.dismiss();
    toast.error(message, {
      ...baseConfig,
      style: {
        background: 'rgba(254, 226, 226, 0.9)',
        borderLeft: '4px solid #ef4444',
        color: '#991b1b'
      }
    });
  },
  info: (message: string) => {
    toast.dismiss();
    toast.info(message, {
      ...baseConfig,
      style: {
        background: 'rgba(219, 234, 254, 0.9)',
        borderLeft: '4px solid #3b82f6',
        color: '#1e40af'
      }
    });
  },
};
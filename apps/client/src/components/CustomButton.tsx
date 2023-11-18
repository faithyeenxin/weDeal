import { Button, styled } from '@mui/material';
import React from 'react';

interface CustomButtonProps {
  label: string;
}

const CustomButton = ({ label }: CustomButtonProps) => {
  return (
    <Button
      fullWidth
      type='submit'
      size='large'
      sx={{
        background: `linear-gradient(90deg, #FE400E 0%, #FF5935 47.4%, #FFAD1D 100%)`,
        color: '#f2f2f2',
        letterSpacing: '0.1rem',
        fontWeight: 600,
        borderRadius: 3,
        '&:hover': {
          background: `linear-gradient(90deg, #FFAD1D 0%, #FF5935 47.4%, #FE400E 100%)`,
        },
      }}
    >
      {label}
    </Button>
  );
};

export default CustomButton;

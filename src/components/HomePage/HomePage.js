import React from 'react';
import { Button, Typography } from '@mui/material';

function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <Typography variant="h2" align="center">
        Welcome to ScrapYard!
      </Typography>
      <Typography variant="h6" align="center">
        Would you like to demo or sign in and use the admin panel?
      </Typography>
      <div style={{ margin: 16 }}>
        <Button variant="contained" color="primary">
          Demo
        </Button>
        <Button variant="contained" color="secondary" style={{ marginLeft: 8 }}>
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <Typography variant="h2" align="center">
        Welcome to ScrapYard!
      </Typography>
      <Typography variant="h6" align="center">
        Sign in to get started! 
      </Typography>
      <div style={{ margin: 16 }}>
        <Button variant="contained" color="secondary" style={{ marginLeft: 8 }}>
          <Link to="/signin" className="link">
            Sign in
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
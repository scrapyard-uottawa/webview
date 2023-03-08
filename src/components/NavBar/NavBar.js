import React from 'react';
import { makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './NavBar.css';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'black',
        height: '64px',
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: '1.7rem',
        marginLeft: '20px'
    }, 
    button: {
        color: 'white',
        fontSize: '1.5rem',
        marginLeft: '20px'
    }
});

export default function NavBar() {
  const classes = useStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Scrapyard
      </Typography>
      <Button style={{color: 'white', marginLeft: '20px'}}><Link to="/admin" className="link">Admin</Link></Button>
      <Button style={{color: 'white'}}><Link to="/dev" className="link">Dev</Link></Button>
      <Button style={{color: 'white'}}><Link to="/signin" className="link">Sign In</Link></Button>
    </Toolbar>
  );
}
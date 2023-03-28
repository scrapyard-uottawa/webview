import React from 'react';
import { makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { textTransform } from '@mui/system';

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
        marginLeft: '20px',
        textTransform: 'none',
    }, 
    button: {
        color: 'white',
        fontSize: '1.5rem',
        marginLeft: '20px'
    },
});

export default function NavBar() {
  const classes = useStyles();

  return (
    <div>
    <NavBar />
    <Toolbar className={classes.root}>
      <Button style={{color: 'white'}}>
        <Typography variant="h6" className={classes.title}>
          <Link to="/" className="link">
            ScrapYard
          </Link>
        </Typography>
      </Button>
      <Button style={{color: 'white', marginLeft: '20px'}}><Link to="/admin" className="link">Admin</Link></Button>
      <Button style={{color: 'white'}}><Link to="/usersAssigned" className="link">Assign Users</Link></Button>
      <div style={{flexGrow: 1}}></div>
      <Button style={{color: 'white'}}><Link to="/signin" className="link">Sign In</Link></Button>
      <Button style={{color: 'white'}}><Link to="/dev" className="link">Data Upload</Link></Button>
      <Button style={{color: 'white'}}><Link to="/dev2" className="link">Trash Form</Link></Button>
    </Toolbar>
    </div>
  );
}
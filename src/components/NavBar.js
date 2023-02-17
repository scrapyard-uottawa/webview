import React from 'react';
import { makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'black',
        height: '64px',
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: '1.5rem',
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
      <Button style={{color: 'white'}}>Admin</Button>
      <Button style={{color: 'white'}}>Dev</Button>
      <Button style={{color: 'white'}}>Sign In</Button>
    </Toolbar>
  );
}

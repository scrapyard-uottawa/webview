import { React, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './NavBar.css';
import "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Cookies from 'js-cookie';

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
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(Cookies.get('role'));

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    setRole(Cookies.get('role'));
  }, [role]);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      Cookies.remove('email');
      Cookies.remove('role');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Toolbar className={classes.root}>
      <Button style={{ color: "white" }}>
        <Typography variant="h6" className={classes.title}>
          <Link to="/" className="link">
            ScrapYard
          </Link>
        </Typography>
      </Button>
      {role === 'Admin' || role === 'Dev' || role === 'User' ? ( // only show Admin button if role is Admin or Dev
        <Button style={{ color: "white", marginLeft: "20px" }}>
          <Link to="/admin" className="link">
            Machine List
          </Link>
        </Button>
      ) : null}
      {role === 'User' || role === 'Admin' || role === 'Dev' ? ( // only show Assign Users button if role is User, Admin or Dev
        <Button style={{ color: "white" }}>
          <Link to="/usersAssigned" className="link">
            Users List
          </Link>
        </Button>
      ) : null}
      {role === 'Dev' ? ( // only show Upload Machine and Upload Trash buttons if role is Dev
        <>
          <Button style={{ color: "white" }}>
            <Link to="/dev" className="link">
              Upload Machine
            </Link>
          </Button>
          <Button style={{ color: "white" }}>
            <Link to="/dev2" className="link">
              Upload Trash
            </Link>
          </Button>
        </>
      ) : null}
      <div style={{ flexGrow: 1 }}></div>
      {loggedIn ? (
        <Button
          style={{ color: "white" }}
          onClick={handleSignOut}
          component={Link}
          to="/signin"
          className="link"
        >
          Sign Out
        </Button>
      ) : (
        <Button
          style={{ color: "white" }}
          component={Link}
          to="/signin"
          className="link"
        >
          Sign In
        </Button>
      )}
    </Toolbar>
  );
}
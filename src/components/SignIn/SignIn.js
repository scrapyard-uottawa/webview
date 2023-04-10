import React, { useState, useEffect } from "react";
import { Button, Tab, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/auth";
import Cookies from "js-cookie";
import { auth, provider } from "../../index";
import { signInWithPopup } from "firebase/auth";
import { Google } from "@mui/icons-material";
import logo from './logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'red',
    },
  },
}));

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    // Use onAuthStateChanged to listen for auth changes
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        Cookies.set("email", user.email);
        fetchData(user); // Call fetchData here
      } else {
        setLoggedIn(false);
        Cookies.remove("email");
        Cookies.remove("role");
      }
    });
    return unsubscribe;
  }, []);
  
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      Cookies.set("email", email);
      fetchData(firebase.auth().currentUser); // Call fetchData here
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      signInWithPopup(auth, provider).then((data) => {
        setEmail(data.user.email);
        Cookies.set("email", data.user.email);
        fetchData(data.user); // Call fetchData here
      })
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      Cookies.remove("email");
      Cookies.remove("role");
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchData = async (user) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/getRole`);
      const data = await response.json();
      let role = data.filter(
        (row) =>
          row.User === (user?.email) // Use Google result email if user is null
      );
      Cookies.set("role", role[0]?.Type || "User");
    } catch (error) {
      console.log(error);
    }
  };

  function getArticle() {
    if (Cookies.get("role") === "Admin") {
      return "an";
    } else {
      return "a";
    }
  }

  return (
    <Box
      className="sign-in-page"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
    >
      <img src={logo} alt="logo" style={{ height: '20vh' }} />
      
      {loggedIn ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h4" align="center">
            Log Out
          </Typography>
          <Typography variant="h6" align="center">
            You are signed in as {getArticle()} {Cookies.get('role')}.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ width: "fit-content", marginTop: 2 }}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="h4" align="center">
            Sign In
          </Typography>
          <br />
          {/* Add a sign in with Google button */}
          <Button onClick={handleGoogleSignIn} sx={{ width:'fit-content', border: 1 }}> 
            <Google /><Tab label="Sign In with Google" />
          </Button>
          <Box display="flex" alignItems="center" sx={{ margin: 2 }}>
            <hr style={{ width: "100%" }} />
            <Typography variant="body1" sx={{ margin: "0 10px" }}>
              OR
            </Typography>
            <hr style={{ width: "100%" }} />
          </Box>
          {/* Keep the regular sign in form */}
          <form className="sign-in-form">
            <Box display="flex" flexDirection="column" alignItems="center">
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                sx={{ width: "fit-content", marginTop: "10%" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{style:{color:'white'},classes:{notchedOutline :classes.notchedOutline}}} 
                InputLabelProps={{style:{color:'white'}}} 
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                sx={{ width: "fit-content" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{style:{color:'white'},classes:{notchedOutline :classes.notchedOutline}}} 
                InputLabelProps={{style:{color:'white'}}} 
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ width: "fit-content", marginTop: 2 }}
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            </Box>
          </form>
        </>
      )}
    </Box>
  );
}

export default SignIn;
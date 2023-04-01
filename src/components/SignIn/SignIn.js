import React, { useState, useEffect } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/auth";
import Cookies from "js-cookie";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

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
      <Typography variant="h4" align="center">
        Sign In
      </Typography>
      {loggedIn ? (
        <Box display="flex" flexDirection="column" alignItems="center">
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
          {/* Add a sign in with Google button */}
          {/* <GoogleOAuthProvider clientId={process.env.REACT_APP_GSIGNIN_CLIENT_ID}>
            <GoogleLogin
              clientId={process.env.REACT_APP_GSIGNIN_CLIENT_ID}
              onSuccess={handleGoogleSignIn}
              onFailure={handleGoogleSignIn}
              cookiePolicy={"single_host_origin"}
            />
          </GoogleOAuthProvider> */}
          {/* Add a horizontal line with OR text */}
          {/* <Box display="flex" alignItems="center" sx={{ margin: 2 }}>
            <hr style={{ width: "100%" }} />
            <Typography variant="body1" sx={{ margin: "0 10px" }}>
              OR
            </Typography>
            <hr style={{ width: "100%" }} />
          </Box> */}
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
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                sx={{ width: "fit-content" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
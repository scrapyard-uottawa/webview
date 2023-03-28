import React, { useState } from "react";
import "./SignIn.css";
import logo from './logo.webp';
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
// import { auth } from "./firebase";
import 'firebase/firestore';
import  db  from "../../firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const handleSignIn = (event) => {
  //   event.preventDefault();
  //   auth.signInWithEmailAndPassword(email, password)
  //     .then((userCredential) => {
  //       // Signed in 
  //       const user = userCredential.user;
  //       console.log(user);
  //       // Redirect to appropriate page based on user role
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.error(errorCode, errorMessage);
  //     });
  // };
  async function checkCredentials(userName, password) {
  
    const usersRef = db.collection('Users');
    const adminDoc = await usersRef.doc('admin').get();
    const devDoc = await usersRef.doc('dev').get();
    const usersDoc = await usersRef.doc('users').get();
  
    const docs = [adminDoc, devDoc, usersDoc];
    const foundInDocs = [];
    var id = null
  
    docs.forEach(doc => {
      const data = doc.data();
      console.log("data", data);
      if (data.userName == userName && data.password == password) {
        console.log(doc.id,"really")
        id = doc.id;
        foundInDocs.push(doc.id);
        return doc.id;
      }
    });
  
    if (foundInDocs.length === 0) {
      console.log('Credentials not found');
    } else {
      console.log(`Credentials found in documents: ${foundInDocs.join(', ')}`);
    }
    return id;
  }

  async function handlesignin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const test = await checkCredentials(email, password);
    console.log(email, password, test);
    if(test == "admin"){window.location.href = "/admin/admin"}
    if(test == "dev"){window.location.href = "/admin/dev"}
    if(test == "users"){window.location.href = "/admin/users"}
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
    
      <Box
        className="logo-box"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100px",
          margin: "20px 0"
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </Box>
      <Typography variant="h4" align="center">
      Sign In
      </Typography>
      <Box
        className="sign-in-form" 
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <TextField
          label="Email"
          id="email"
          variant="outlined"
          margin="normal"
          sx={{ width: "100%", marginTop: "10%" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          id="password"
          type="password"
          variant="outlined"
          margin="normal"
          sx={{ width: "100%", marginTop: "10%" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ width: "fit-content", marginTop: 2 }}
          type="submit"
          onClick={handlesignin}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
}

export default SignIn;
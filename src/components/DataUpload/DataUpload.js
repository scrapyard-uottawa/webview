import React, { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'red',
    },
  },
}));

// A function that validates the input data
const validateDataMachine = (data) => {
  // Check if all fields are filled
  if (
    !data.MachineID ||
    !data.Machine_Name ||
    !data.Black_Bin ||
    !data.Blue_Bin ||
    !data.Compost ||
    !data.Garbage ||
    !data.GPS
  ) {
    return false;
  }
  // Check if Black_Bin, Blue_Bin, Compost and Garbage are float numbers
  if (
    isNaN(data.Black_Bin) ||
    isNaN(data.Blue_Bin) ||
    isNaN(data.Compost) ||
    isNaN(data.Garbage)
  ) {
    return false;
  }
  // If all checks pass, return true
  return true;
};

// A function that sends a post request to the node.js server with the input data
const uploadMachine = async (data) => {
  try {
    // Set the url and headers for the request
    const url = `${process.env.REACT_APP_API_ENDPOINT}/uploadMachine`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa("Node:password")}`, // Encode the username and password in base64 format
    };
    
    console.log(data)

     // Send the post request with axios and get the response
     const response = await axios.post(url, data, { headers });
     
    console.log(response.data)

     // Return the response data
     return response.data;
   } catch (error) {
     // If there is an error, throw it
     console.log(error)
    //  console.log(process.env.REACT_APP_API_ENDPOINT)
     throw error;
   }
 };

// The DataUpload component that renders a form with text fields and a button 
const DataUpload = () => {
  
   // Use state hooks to store the input data and the message 
   const [data, setData] = useState({
     MachineID: "",
     Machine_Name: "",
     Black_Bin: "",
     Blue_Bin: "",
     Compost: "",
     Garbage: "",
     GPS: ["",""],
   });
   
   const [message, setMessage] = useState("");
   
   const classes = useStyles();

   // A handler function that updates the state when the text fields change 
   const handleChange = (event) => {
     
      // Get the name and value of the changed field 
      const { name, value } = event.target;
      
      // Update the state with the new value 
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Update the state with the new value 
      setData((prevData) => {
        if (name === "Longitude" || name === "Latitude") {
          // Update GPS array
          const index = name === "Longitude" ? 0 : 1;
          return {
            ...prevData,
            GPS: [
              ...prevData.GPS.slice(0, index),
              value,
              ...prevData.GPS.slice(index + 1),
            ],
          };
        } else {
          return {
            ...prevData,
            [name]: value,
          };
        }
      });
      
      // Reset the message 
      setMessage("");
      
   };
   
   // A handler function that submits the form when the button is clicked 
   const handleSubmit = async (event) => {
     
       // Prevent default behavior of form submission 
       event.preventDefault();
       
       // Validate the input data 
       const isValid = validateDataMachine(data);
       
       if (isValid) {
         try {
           // Upload the data to the server and get back a message 
           const result = await uploadMachine(data);
           
           // Set the message to display on screen 
           setMessage(result.message);
           
         } catch (error) {
           // If there is an error, set an error message 
           setMessage(error.message);
         }
       } else {
         // If validation fails, set an invalid message 
         setMessage("Invalid input data");
       }
       
   };
   
   return (
     
       <div className="DataUpload">
         
          <h1>Data Upload</h1>
          
          <form onSubmit={handleSubmit}>
            
          <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="Machine ID"
              name="MachineID"
              type="text"
              value={data.MachineID}
              onChange={handleChange}
              InputProps={{
                style: { color: 'white' },
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Machine Name"
              name="Machine_Name"
              type="text"
              value={data.Machine_Name}
              onChange={handleChange}
              InputProps={{
                style: { color: 'white' },
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Black Bin"
              name="Black_Bin"
              type="percent"
              value={data.Black_Bin}
              onChange={handleChange}
              InputProps={{
                style: { color: 'white' },
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Blue Bin"
              name="Blue_Bin"
              type="number"
              value={data.Blue_Bin}
              onChange={handleChange}
              InputProps={{
                style: { color: 'white' },
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Compost"
              name="Compost"
              type="number"
              value={data.Compost}
              onChange={handleChange}
              InputProps={{
                style: { color: 'white' },
                classes: {
                  notchedOutline: classes.notchedOutline,
                },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Garbage"
                name="Garbage"
                type="number"
                value={data.Garbage}
                onChange={handleChange}
                InputProps={{
                  style: { color: 'white' },
                  classes: {
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                InputLabelProps={{
                  style: { color: 'white' },
                }}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
              label="Longitude" 
              name="Longitude" 
              type="text" 
              value={data.GPS[0]} 
              onChange={handleChange} 
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
            </Grid>
            <Grid item xs={12}>
            <TextField 
              label="Latitude" 
              name="Latitude" 
              type="text" 
              value={data.GPS[1]} 
              onChange={handleChange} 
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
            </Grid>
            <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Upload
            </Button>
            </Grid>
          </Grid>
          </form>
          <p>{message}</p>
        </div>

    );
};

export default DataUpload;
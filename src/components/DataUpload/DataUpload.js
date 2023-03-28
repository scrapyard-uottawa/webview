import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import NavBar from '../NavBar/NavBar';

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
    const url = "http://localhost:5000/uploadMachine";
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

   console.log(data, "DataUpload()")
   
   const [message, setMessage] = useState("");
   
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

       <div>
      <NavBar />
       <div className="DataUpload">
         
          <h1>Data Upload</h1>
          
          <form onSubmit={handleSubmit}>
            
              <TextField
                name="MachineID"
                label="Machine ID"
                type="text"
                value={data.MachineID}
                onChange={handleChange}
              />
              
              <TextField
                name="Machine_Name"
                label="Machine Name"
                type="text"
                value={data.Machine_Name}
                onChange={handleChange}
              />
              
              <TextField
                name="Black_Bin"
                label="Black Bin"
                type="percent"
                value={data.Black_Bin}
                onChange={handleChange}
              />
              
              <TextField
                name="Blue_Bin"
                label="Blue Bin"
                type="number"
                value={data.Blue_Bin}
                onChange={handleChange}
              />
              
              <TextField
                 name="Compost"
                 label="Compost"
                 type="number"
                 value={data.Compost}
                 onChange={handleChange}
              />

              <TextField
                name="Garbage"
                label="Garbage"
                type="number"
                value={data.Garbage}
                onChange={handleChange}
              />

              <TextField
                name="Longitude"
                label="Longitude"
                type="text"
                value={data.GPS[0]}
                onChange={handleChange}
              />

              <TextField
                name="Latitude"
                label="Latitude"
                type="text"
                value={data.GPS[1]}
                onChange={handleChange}
              />

              <Button type="submit" variant="contained" color="primary">
                Upload
              </Button>

          </form>

          <p>{message}</p>

        </div>
        </div>

    );
};

export default DataUpload;
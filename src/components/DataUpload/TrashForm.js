import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";

// A function that validates the input data
const validateDataTrash = (data) => {
  // Check if all fields are filled
  if (
    !data.MachineID ||
    !data.ID ||
    !data.TimeStamp ||
    !data.ML_Confidence ||
    !data.WasteType ||
    !data.Image
  ) {
    return false;
  }
  // Check if ML_Confidence is a float number
  if (isNaN(data.ML_Confidence)) {
    return false;
  }
  // Check if WasteType is one of Blue Bin, Black Bin, Compost or Garbage
  if (
    data.WasteType !== "Blue Bin" &&
    data.WasteType !== "Black Bin" &&
    data.WasteType !== "Compost" &&
    data.WasteType !== "Garbage"
  ) {
    return false;
  }
  
   // If all checks pass, return true
   return true;
};

// A function that sends a post request to the node.js server with the input data
const uploadTrash = async (data) => {
   try {
     // Set the url and headers for the request
    const url = "http://localhost:5000/uploadTrash";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa("Node:password")}`, // Encode the username and password in base64 format
    };
     
     console.log(data)

      // Send the post request with axios and get the response
      const response = await axios.post(url, data, { headers });
      
     console.log(response.data)
     return response.data;
   } catch (error) {
     console.error(error);
     throw error;
   }
};
const TrashForm = () => {
    const [data, setData] = useState({
      MachineID: "",
      ID: "",
      TimeStamp: "",
      ML_Confidence: "",
      WasteType: "",
      Image: null,
    });

    // A handler function that updates the state when the text fields change 
    const handleChange = (event) => {
      
       // Get the name and value of the changed field 
       const { name, value } = event.target;
       
       setData((prevData) => ({
         ...prevData,
         [name]: value,
         }));
       
    };
    
     // A handler function that updates the state when an image file is selected
     const handleFileChange = (event) => {
       setData((prevData) => ({
          ...prevData,
          Image: event.target.files[0],
        }));
     };
     
     // A handler function that submits the form when the button is clicked 
     const handleSubmit = async (event) => {
        // Prevent default behavior of form submission 
        event.preventDefault();
        
        // Validate the input data 
        if (validateDataTrash(data)) {
          try {
            // Upload the data to the server and get back a message 
            await uploadTrash(data);           
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log('Invalid input data')
        }
    };
    
    return (
      <div className="TrashForm">
        <h1>Trash Form</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            name="MachineID"
            label="Machine ID"
            type="text"
            value={data.MachineID}
            onChange={handleChange}
          />
          <TextField
            name="ID"
            label="ID"
            type="text"
            value={data.ID}
            onChange={handleChange}
          />
          <TextField
            name="TimeStamp"
            label=""
            type="datetime-local"
            value={data.TimeStamp}
            onChange={handleChange}
          />
          <TextField
            name="ML_Confidence"
            label="ML Confidence"
            type="number"
            step="any"
            value={data.ML_Confidence}
            onChange={handleChange}
          />
          <TextField
            name="WasteType"
            label="Waste Type"
            type="text"
            value={data.WasteType}
            onChange={handleChange}
          />
          <input type="file" onChange={handleFileChange} />
          <Button type="submit" variant="contained" color="primary">
            Upload
          </Button>
        </form>
      </div>
    );
};

export default TrashForm;
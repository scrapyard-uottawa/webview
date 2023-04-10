import React, { useState } from "react";
import { Button, TextField, Grid, Input } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'red',
    },
  },
}));

const uploadTrash = async (d) => {
  try {
    const e = `${process.env.REACT_APP_API_ENDPOINT}/uploadTrash`;
    const t = {
      Authorization: `Basic ${btoa("Node:password")}`,
      "Content-Type": "multipart/form-data", // change this header
    };
    // create a FormData object
    let formData = new FormData();
    // append the file and other data
    formData.append("Image", d.Image);
    formData.append("MachineID", d.MachineID);
    formData.append("ID", d.ID);
    formData.append("TimeStamp", d.TimeStamp);
    formData.append("ML_Confidence", d.ML_Confidence);
    formData.append("WasteType", d.WasteType);

    const r = await axios.post(e, formData, { headers: t }); // send formData instead of d
    return r.data;
  } catch (e) {
    throw e;
  }
};
const TrashForm = () => {
  const [d, setData] = useState({
    MachineID: "",
    ID: "",
    TimeStamp: "",
    ML_Confidence: "",
    WasteType: "",
    Image: null,
  });

  const classes = useStyles();

  const handleChange = (e) => {
    const { name: t, value: r } = e.target;
    setData((e) => ({ ...e, [t]: r }));
  };
  const handleFileChange = (e) => {
    setData((t) => ({ ...t, Image: e.target.files[0] }));
  };
  const handleSubmit = async (e) => {
    
     // define a validateDataTrash function that checks if the data is valid
     const validateDataTrash = (data) => {
       // check if all fields are filled
       for (let key in data) {
         if (!data[key]) return false;
       }
       // check if image file is valid
       if (!data.Image.type.startsWith("image/")) return false;
       return true;
     };

     e.preventDefault();
     validateDataTrash(d) && (await uploadTrash(d)); // use validateDataTrash function here
   };
   return (
     <div className="TrashForm">
       <h1>Trash Form</h1>
       <form onSubmit={handleSubmit}>
       <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
          name="MachineID"
          label="Machine ID" 
          type="text" 
          value={d.MachineID} 
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
          name="ID" 
          label="ID" 
          type="text" 
          value={d.ID} 
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
          name="TimeStamp" 
          label="" 
          type="datetime-local" 
          value={d.TimeStamp} 
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
          name="ML_Confidence" 
          label="ML Confidence" 
          type="number" 
          step="any"
          value={d.ML_Confidence} 
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
          name="WasteType" 
          label="Waste Type" 
          type="text" 
          value={d.WasteType} 
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
          <Input 
          type= "file" 
          onChange= {handleFileChange} 
          color="secondary" 
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
          <Button variant="contained" color="primary" type="submit"> Upload </Button>
        </Grid>
      </Grid>
      </form> 
     </div>
   );
};

export default TrashForm;
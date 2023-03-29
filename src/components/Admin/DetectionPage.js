import { React, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import './DetectionPage.css';

const DetectionPage = () => {
  const [detectionData, setDetectionData] = useState({});
  const MachineID = useParams().mid;
  const TrashID = useParams().tid;

 // Use useEffect to fetch data only once when component mounts
 useEffect(() => {
    // Define a function to fetch data
    const fetchData = async () => {
      try {
        // Use await to get the response
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/getDetections`);
        // Convert it to json
        const data = await response.json();
        // Filter the data by MachineID and ID
        const detectionsData = data.filter(
          (row) => row.MachineID === MachineID && row.ID === TrashID
        );
        // Set the state with the filtered data
        setDetectionData(detectionsData[0]);
      } catch (error) {
        // Handle any errors
        alert(error);
      }
    };
    // Call the function
    fetchData();
  }, [MachineID, TrashID]); // Pass MachineID and TrashID as dependencies


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
      }}
    >
      <img className='img' src={`data:image/png;base64,${detectionData.base64}`} alt="detection" width="50%" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '50%',
          marginTop: 2,
        }}
      >
        <Typography variant="h6">ID: {detectionData.ID}</Typography>
        <Typography variant="h6">
          Time Stamp: {new Date(detectionData.TimeStamp).toLocaleString()}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '50%',
          marginTop: 2,
        }}
      >
        <Typography variant="h6">
          ML Confidence: {(detectionData.ML_Confidence * 100).toFixed(2) /* convert to percentage */}%
        </Typography>
        <Typography variant="h6">Waste Type: {detectionData.WasteType}</Typography>
      </Box>
    </Box>
  );
};

export default DetectionPage;
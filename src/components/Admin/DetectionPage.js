import React from 'react';
import { Box, Typography } from '@mui/material';
import imageJSON from './detections.json';

const DetectionPage = () => {
  const { id, image, timeStamp, mlConfidence, wasteType } = imageJSON[0];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <img src={image} alt="detection" width="50%" />
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
        <Typography variant="h6">ID: {id}</Typography>
        <Typography variant="h6">
          Time Stamp: {new Date(timeStamp).toLocaleString()}
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
          ML Confidence:{' '}
          {(mlConfidence * 100).toFixed(2) /* convert to percentage */}%
        </Typography>
        <Typography variant="h6">Waste Type: {wasteType}</Typography>
      </Box>
    </Box>
  );
};

export default DetectionPage;
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import './DetectionsList.css';
import L from 'leaflet';
import detectionsJSON from './detections.json';

const DetectionsList = () => {
  
  // state for the detections data
  const [detections, setDetections] = useState([]);

  const icon = new L.Icon({
    iconUrl: 'images/marker-icon.png',
    iconRetinaUrl: 'images/marker-icon-2x.png',
  });

  // fetch the data from the JSON file on mount
  useEffect(() => {
    setDetections(detectionsJSON);
  }, []);

  // position of the pin on the map
  const position = [45.41949167957291, -75.6785976087304];

  // bin capacities as percentages
  const binCapacities = {
    blackBin: 0.47,
    blueBin: 0.52,
    compost: 0.38,
    garbage: 0.75
  };
  return (
    <div className="detections-list">
        <h2>Machine Name: uOttawa SITE Test</h2>
  <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height: '10vh'}}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors' />
    <Marker position={position} icon={icon}></Marker>
  </MapContainer>
  <h3>Bin Capacity</h3>
  <div className="bin-capacity">
    <div className="bin">
      <h5>Black Bin</h5>
      <p>{(binCapacities.blackBin * 100).toFixed(0)}%</p>
      {/* A black bar with width equal to binCapacities.blackBin * 100% */}
      <div style={{height: '10px', width: '100%', backgroundColor: '#ccc'}}>
        <div style={{height: '10px', width: `${binCapacities.blackBin * 100}%`, backgroundColor: '#000'}}></div>
      </div>
    </div>
    <div className="bin">
      <h5>Blue Bin</h5>
      <p>{(binCapacities.blueBin * 100).toFixed(0)}%</p>
      {/* A blue bar with width equal to binCapacities.blueBin * 100% */}
      <div style={{height: '10px', width: '100%', backgroundColor: '#ccc'}}>
        <div style={{height: '10px', width: `${binCapacities.blueBin * 100}%`, backgroundColor: '#00f'}}></div>
      </div>
    </div>
    <div className="bin">
      <h5>Compost</h5>
      <p>{(binCapacities.compost * 100).toFixed(0)}%</p>
      {/* A green bar with width equal to binCapacities.compost * 100% */}
      <div style={{height: '10px', width: '100%', backgroundColor: '#ccc'}}>
        <div style={{height: '10px', width: `${binCapacities.compost * 100}%`, backgroundColor: '#0f0'}}></div>
      </div>
    </div>
    <div className="bin">
      <h5>Garbage</h5>
      <p>{(binCapacities.garbage * 100).toFixed(0)}%</p>
       {/* A red bar with width equal to binCapacities.garbage * 100% */}
       <div style={{height: '10px', width: '100%', backgroundColor: '#ccc'}}>
        <div style={{height: '10px', width:`${binCapacities.garbage * 100}%`, backgroundColor:'#f00'}}></div> 
       </div> 
    </ div > 
   </ div > 
      <h3>Detections</h3>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Time Stamp</TableCell>
              <TableCell>Machine Learning Confidence</TableCell>
              <TableCell>Waste Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detections.map(detection => (
              <TableRow key={detection.id}>
                <TableCell>{detection.id}</TableCell>
                <TableCell><img src={detection.image} alt="Detection" height="100"/></TableCell>
                <TableCell>{detection.timeStamp}</TableCell>
                <TableCell>{(detection.mlConfidence * 100).toFixed(2)}%</TableCell>
                <TableCell>{detection.wasteType}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
};

export default DetectionsList;
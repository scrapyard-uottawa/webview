import { React, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import './DetectionsList.css';
import { L, Icon } from 'leaflet';
import { Link, useParams } from 'react-router-dom';

const DetectionsList = () => {
  
  // state for the detections data
  const [detections, setDetections] = useState([]);
  const MachineID = useParams().id;
  const [position, setPosition] = useState([45.41949167957291,-75.6785976087304]);
  const [binCapacities, setBinCapacities] = useState({
    blackBin: 0.47,
    blueBin: 0.52,
    compost: 0.38,
    garbage: 0.75
  });

  const markerIcon = new Icon({
    iconUrl: 'images/marker-icon-2x.png',
    iconRetinaUrl: 'images/marker-icon-2x.png',
    iconAnchor: [10, 35], 
    iconSize: [20, 35],
  });
  
  useEffect(() => {
    // create an array of promises for both fetch requests
    const promises = [
      fetch('http://192.168.2.15:5000/getDetections'),
      fetch('http://192.168.2.15:5000/getMachines')
    ];
  
    // use Promise.all() to wait for all promises to resolve
    Promise.all(promises)
      .then(responses => {
        // map each response to a json object
        return Promise.all(responses.map(response => response.json()));
      })
      .then(data => {
        // data is an array of json objects from each endpoint
        const detectionsData = data[0];
        const machinesData = data[1];
  
        // filter the detections data by MachineID
        const filteredData = detectionsData.filter(row => row.MachineID === MachineID);
        setDetections(filteredData);
  
        // find the machine data by MachineID
        const machine = machinesData.find(row => row.MachineID === MachineID);
        if (machine) {
          setPosition([machine.GPS[0], machine.GPS[1]]);
          setBinCapacities({
            blackBin: machine.Black_Bin,
            blueBin: machine.Blue_Bin,
            compost: machine.Compost,
            garbage: machine.Garbage
          });
        }
      });
  }, []);

  return (
    <div className="detections-list">
      <h2>Machine Name: uOttawa SITE Test</h2>
      <MapContainer center={position} zoom={16} scrollWheelZoom={true} style={{height: '30vh'}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker icon={markerIcon} position={position} />
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
        </div> 
      </div> 
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
                  <TableRow key={detection.ID}>
                    <TableCell><Link to="/individualDetection">{detection.ID}</Link></TableCell>
                    <TableCell>
                    <img
                        src={`data:image/png;base64,${detection.base64}`} // add data URI scheme here
                        alt="Detection"
                        height="100"
                    />
                    </TableCell>
                    <TableCell>{detection.TimeStamp}</TableCell>
                    <TableCell>{(detection.ML_Confidence * 100).toFixed(2)}%</TableCell>
                    <TableCell>{detection.WasteType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

  );
};

export default DetectionsList;
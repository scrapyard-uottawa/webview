import { React, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Link } from 'react-router-dom';
import './MachineList.css';

const icon = new L.Icon({
  iconUrl: 'images/marker-icon.png',
  iconRetinaUrl: 'images/marker-icon-2x.png',
  iconAnchor: [10, 35], 
  iconSize: [20, 35],
});

const MachineList = () => {
  const [machinesData, setMachinesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://192.168.2.15:5000/getMachines');
        const data = await res.json();
        setMachinesData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="machine-list">
      <h1>List of Machines</h1>
      <MapContainer center={[45.41949167957291,-75.6785976087304]} zoom={15} scrollWheelZoom={true} style={{height: '20vh'}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {machinesData.map((machine) => (
          <Marker key={machine.MachineID} position={[machine.GPS[0], machine.GPS[1]]} icon={icon} />
        ))}
      </MapContainer>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Machine ID</TableCell>
              <TableCell>Machine Name</TableCell>
              <TableCell>Black Bin</TableCell>
              <TableCell>Blue Bin</TableCell>
              <TableCell>Compost</TableCell>
              <TableCell>Garbage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {machinesData.map((machine) => (
              <TableRow key={machine.MachineID}>
                <TableCell>
                  <Link to={`/detections/${machine.MachineID}`}> {machine.MachineID} </Link>
                </TableCell> 
                <TableCell>{machine.Machine_Name}</TableCell> 
                <TableCell>{(machine.Black_Bin * 100).toFixed(2)}%</TableCell> 
                <TableCell>{(machine.Blue_Bin * 100).toFixed(2)}%</TableCell>
                <TableCell>{(machine.Compost * 100).toFixed(2)}%</TableCell>
                <TableCell>{(machine.Garbage * 100).toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
};

export default MachineList;
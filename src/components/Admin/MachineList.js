import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Link } from 'react-router-dom';
import machinesJSON from './machines.json';

const icon = new L.Icon({
  iconUrl: 'images/marker-icon.png',
  iconRetinaUrl: 'images/marker-icon-2x.png',
});

const MachineList = () => {
  return (
    <div className="machine-list">
      <h1>List of Machines</h1>
      <MapContainer center={[45.41949167957291, -75.6785976087304]} zoom={15} scrollWheelZoom={false} style={{height: '10vh'}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {machinesJSON.map((machine) => (
          <Marker key={machine.id} position={[machine.lat, machine.lng]} icon={icon} />
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
            {machinesJSON.map((machine) => (
              <TableRow key={machine.id}>
                <TableCell><Link to="/detections">{machine.id}</Link></TableCell> 
                <TableCell>{machine.name}</TableCell>
                <TableCell>{(machine.blackBin * 100).toFixed(2)}%</TableCell> 
                <TableCell>{(machine.blueBin * 100).toFixed(2)}%</TableCell>
                <TableCell>{(machine.compost * 100).toFixed(2)}%</TableCell>
                <TableCell>{(machine.garbage * 100).toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
};

export default MachineList;
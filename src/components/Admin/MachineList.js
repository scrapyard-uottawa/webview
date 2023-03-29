import { React, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Link } from 'react-router-dom';
import './MachineList.css';
import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';

const icon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker2x,
  iconAnchor: [10, 35], 
  iconSize: [20, 35],
});

const MachineList = () => {
  const [machinesData, setMachinesData] = useState([]);
  const [centerPosition, setCenterPosition] = useState([
    45.41949167957291,
    -75.6785976087304
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/getMachines`);
        const data = await res.json();
        setMachinesData(data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchCenter = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/getMachines`);
        const data = await res.json();
        let center = [0, 0];
        for (let i = 0; i < data.length; i++) {
          center[0] += data[i].GPS[0];
          center[1] += data[i].GPS[1];
        }
        center[0] /= data.length;
        center[1] /= data.length;
        setCenterPosition(center);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCenter();
    fetchData();
  }, []);

  function FlyMapTo() {
    const map = useMap();
    useEffect(() => {
      map.flyTo(centerPosition);
    }, [centerPosition]);
    return null;
  }

  return (
    <div className="machine-list">
      <h1>List of Machines</h1>
      <MapContainer
        center={centerPosition}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "20vh" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {machinesData.map((machine) => (
          <Marker
            key={machine.MachineID}
            position={[machine.GPS[0], machine.GPS[1]]}
            icon={icon}
          />
        ))}
        <FlyMapTo />
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
            {machinesData.sort((a, b) => a.MachineID.localeCompare(b.MachineID)).map((machine) => (
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
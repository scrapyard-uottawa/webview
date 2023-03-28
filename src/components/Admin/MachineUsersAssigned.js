import { React, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import L from "leaflet";
import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import './MachineUsersAssigned.css';
import NavBar from '../NavBar/NavBar';

const icon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker2x,
  iconAnchor: [10, 35], 
  iconSize: [20, 35],
});

const MachineUsersAssigned = () => {
  const [data, setData] = useState([]);
  const [centerPosition, setCenterPosition] = useState([
    45.41949167957291,
    -75.6785976087304
  ]);
  
  // Use useEffect to fetch the data once the component mounts
  useEffect(() => {
    // Define an async function to fetch the data
    async function fetchData() {
      // Use try/catch to handle errors
      try {
        // Make a GET request to your server endpoint
        const response = await fetch('http://localhost:5000/getMachines');
        // Check if the response is ok
        if (response.ok) {
          // Parse the response as JSON
          const result = await response.json();
          // Map over the result array and extract only the columns you need
          const newData = result.map(row => ({
            GPS: row.GPS,
            MachineID: row.MachineID,
            Machine_Name: row.Machine_Name,
            Users: row.Users
          }));
          // Set the state with the new data
          setData(newData);
        } else {
          // Throw an error if the response is not ok
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        // Log or handle the error
        console.error(error);
      }
    }
    // Set the center position
    const fetchCenter = async () => {
      try {
        const res = await fetch("http://192.168.2.15:5000/getMachines");
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
    // Call the async function
    fetchData();
    fetchCenter();
  }, []); // Pass an empty dependency array to run only once

  function FlyMapTo() {
    const map = useMap();
    useEffect(() => {
      map.flyTo(centerPosition);
    }, [centerPosition]);
    return null;
  }

  return (
    <div>
    <NavBar />
    <div className="machine-users-assigned">
      <h1>Users Assigned</h1>
      <MapContainer
        style={{ height: "20vh"}}
        center={centerPosition}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data.map((machine) => (
          <Marker key={machine.MachineID} position={[machine.GPS[0], machine.GPS[1]]} icon={icon} />
        ))}
        <FlyMapTo />
      </MapContainer>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Machine ID</TableCell>
              <TableCell>Machine Name</TableCell>
              <TableCell>Users Assigned</TableCell>
              <TableCell>Add Users</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.sort((a, b) => a.MachineID.localeCompare(b.MachineID)).map((machine) => (
              <TableRow key={machine.MachineID}>
                <TableCell><Link to={`/detections/${machine.MachineID}`}>{machine.MachineID}</Link></TableCell>
                <TableCell>{machine.Machine_Name}</TableCell>
                <TableCell>{machine.Users ? machine.Users.join(", ") : "None"}</TableCell>
                <TableCell><Link style={{textDecoration: 'none'}} to={`/addUsers/${machine.MachineID}`}><Button variant="contained">Add/Remove User(s)</Button></Link></TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </div>
  );
};

export default MachineUsersAssigned;
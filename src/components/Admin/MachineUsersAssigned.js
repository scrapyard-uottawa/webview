import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import usersAssignedJSON from "./machines.json";
import L from "leaflet";

const icon = new L.Icon({
  iconUrl: "images/marker-icon.png",
  iconRetinaUrl: "images/marker-icon-2x.png",
});

const MachineUsersAssigned = () => {
  return (
    <div>
      <h2>Users Assigned</h2>
      <MapContainer
        style={{ height: "10vh", width: "100vw" }}
        center={[45.42, -75.68]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {usersAssignedJSON.map((machine) => (
          <Marker key={machine.id} position={[machine.lat, machine.lng]} icon={icon} />
        ))}
      </MapContainer>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Machine ID</TableCell>
              <TableCell>Machine Name</TableCell>
              <TableCell>Users Assigned</TableCell>
              <TableCell></TableCell> {/* Empty header for the button column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {usersAssignedJSON.map((machine) => (
              <TableRow key={machine.id}>
                <TableCell>{machine.id}</TableCell>
                <TableCell>{machine.name}</TableCell>
                <TableCell>{machine.userAssigned.join(", ")}</TableCell>
                {/* Button to add or remove users */}
                <TableCell><Button variant="contained">Add/Remove User(s)</Button></TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MachineUsersAssigned;
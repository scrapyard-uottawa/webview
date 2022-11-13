import { machinesRef } from "../../App";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import { MachineCard } from "./components/MachineCard/MachineCard";
import './ListMachines.css';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // import react-leaflet components
import { Icon } from 'leaflet'; // import leaflet components
import 'leaflet/dist/leaflet.css'; // import leaflet css file
import mapMarker from '../../assets/map/mapMarker.svg' // import map marker svg file

const ListMachines = () => {
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        const getMachines = async () => {
            const machinesSnapshot = await getDocs(machinesRef);
            const machinesList = machinesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMachines(machinesList);
        };
        getMachines();
    }, []);

    return (
        <div className="ListMachines">
            <div>
                <h1 class = "list">List of Machines</h1>
                {/* create a MapContainer here which displays a marker at 0 degrees lat and 0 degrees long using mapMarker as the marker */}
                <MapContainer id='map' center={[0, 0]} zoom={17} scrollWheelZoom={false}>
                    <TileLayer // add tile layer

                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {machines.map((machine) => (
                        <Marker position={[machine.machineInfo.locationCord.latitude, machine.machineInfo.locationCord.longitude]} icon={new Icon({iconUrl: mapMarker, iconSize: [32,32]})}>
                            <Popup>{machine.machineInfo.locationName}
                            </Popup>
                        </Marker>
                    ))}

                </MapContainer>

                <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Machine ID</th>
                        <th scope="col">Machine Name</th>
                        <th scope="col">BlackBin</th>
                        <th scope="col">BlueBin</th>
                        <th scope="col">Compost</th>
                        <th scope="col">Garbage</th>
                    </tr>
                </thead>
                <tbody>
                    {machines.map((machine) => (
                        <MachineCard machine={machine} />
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListMachines;
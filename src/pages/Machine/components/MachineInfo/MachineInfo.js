// 
import './MachineInfo.css'; // import css file
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // import react-leaflet components
import { Icon } from 'leaflet'; // import leaflet components
import 'leaflet/dist/leaflet.css'; // import leaflet css file
import mapMarker from '../../../../assets/map/mapMarker.svg' // import map marker svg file
export const MachineInfo = ({ props }) => {



    if (!props) return <p>Data has not been loaded.</p>;
    // <p>{props.locationCord.latitude}, {props.locationCord.longitude}</p>
    const position = [props.locationCord.latitude, props.locationCord.longitude];
    const markerIcon = new Icon({ // create new icon object
        iconUrl: mapMarker, // set icon url to mapMarker svg file
        iconSize: [32, 32], // set icon size
        // iconAnchor: [29, 68], // set icon anchor
        // popupAnchor: [170, 2] // set popup anchor
    });

    return (
        <div className="machine-info">
            <h1>Machine Info</h1>
            <h3>Machine Name: {props.locationName}</h3>
            <MapContainer id='map' center={position} zoom={17} scrollWheelZoom={false}> 
                <TileLayer // add tile layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                />
                <Marker position={position} icon={markerIcon}>
                    <Popup>{props.locationName}
                    </Popup>
                </Marker>

            </MapContainer>
        </div>
    );
};

import { Link } from "react-router-dom";

export const MachineCard = ({ machine }) => {
    return (
        <Link to={`/machine-info/${machine.id}`}>
        <div>
            <h1>{machine.machineInfo.locationName}</h1>
            <h2>MachineID: {machine.id}</h2>
            
            <p>BlackBin: {machine.binCapacity.blackBin}</p>
            <p>BlueBin: {machine.binCapacity.blueBin}</p>
            <p>Compost: {machine.binCapacity.compost}</p>
            <p>Garbage: {machine.binCapacity.garbage}</p>
        </div>
        </Link>
    );
}


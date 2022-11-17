import { Link } from "react-router-dom";
import './MachineCard.css';

function machineInfo() {
    < a href="/machine-info/${machine.id}" />
}

export const MachineCard = ({ machine }) => {
    let capacityBlackBin = Math.round(machine.binCapacity.blackBin * 100) / 100;
    let capacityBlueBin = Math.round(machine.binCapacity.blueBin * 100) / 100;
    let capacityCompost = Math.round(machine.binCapacity.compost * 100) / 100;
    let capacityGarbage = Math.round(machine.binCapacity.garbage * 100) / 100;
    return (
        <tr onClick={machineInfo}>
            <th class="link">
                <Link to={`/machine-info/${machine.id}`}>
                    {machine.id}
                </Link>
            </th>
            <td>{machine.machineInfo.locationName}</td>
            <td>{capacityBlackBin}</td>
            <td>{capacityBlueBin}</td>
            <td>{capacityCompost}</td>
            <td>{capacityGarbage}</td>
        </tr>
    );
}  


import { Link } from "react-router-dom";
import './MachineCard.css';

export const MachineCard = ({ machine }) => {
    return (
        <tr>
            <th class="link">
                <Link to={`/machine-info/${machine.id}`}>
                    {machine.id}
                </Link>
            </th>
            <td>{machine.machineInfo.locationName}</td>
            <td>{machine.binCapacity.blackBin}</td>
            <td>{machine.binCapacity.blueBin}</td>
            <td>{machine.binCapacity.compost}</td>
            <td>{machine.binCapacity.garbage}</td>
        </tr>
    );
}


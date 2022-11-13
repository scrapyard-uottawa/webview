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
                <td>
                    <Link to={`/machine-info/${machine.id}`}>
                        {machine.machineInfo.locationName}
                    </Link>
                </td>
                <td>
                    <Link to={`/machine-info/${machine.id}`}>
                        {machine.binCapacity.blackBin}
                    </Link>
                </td>
                <td>
                    <Link to={`/machine-info/${machine.id}`}>
                        {machine.binCapacity.blueBin}
                    </Link>
                </td>
                <td>
                    <Link to={`/machine-info/${machine.id}`}>
                        {machine.binCapacity.compost}
                    </Link>
                </td>
                <td>
                    <Link to={`/machine-info/${machine.id}`}>
                        {machine.binCapacity.garbage}
                    </Link>
                </td>
        </tr>
    );
}

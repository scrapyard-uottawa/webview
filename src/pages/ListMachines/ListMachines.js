import { machinesRef } from "../../App";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import { MachineCard } from "./components/MachineCard/MachineCard";
import './ListMachines.css';

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
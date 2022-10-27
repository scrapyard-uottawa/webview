import { machinesRef } from "../../App";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MachineCard } from "./components/MachineCard";
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
                <div class = "table table-striped table-hover">
                    {machines.map((machine) => (
                        <tr scope = "row">
                        <MachineCard machine={machine} />
                        </tr>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListMachines;
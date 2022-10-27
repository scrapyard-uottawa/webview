import { machinesRef } from "../../App";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MachineCard } from "./components/MachineCard";

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
        <div>
            <h1>List of Machines</h1>
            {machines.map((machine) => (
                <MachineCard machine={machine} />
            ))}
        </div>
    );
};

export default ListMachines;
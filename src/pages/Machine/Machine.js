import { useParams } from 'react-router-dom';
import {machinesRef} from '../../App';
import { useEffect, useState } from 'react';
import {getDoc, doc} from 'firebase/firestore';

import { MachineInfo } from './components/MachineInfo/MachineInfo';


const Machine = () => {
    const { machineID } = useParams();
    const [machine, setMachine] = useState({});

    useEffect(() => {
        const getMachine = async () => {
            const machineDoc = await getDoc(doc(machinesRef, machineID));
            const machineData = machineDoc.data();
            console.log(machineData);
            setMachine(machineData);
        };
        getMachine();
    }, []);


    return (
        <div>
            <MachineInfo machineInfo={machine.machineInfo} />
        </div>
    );
};

export default Machine;
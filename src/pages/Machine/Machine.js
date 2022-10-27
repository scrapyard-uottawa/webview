import { useParams } from 'react-router-dom';
import {machinesRef} from '../../App';
import { useEffect, useState } from 'react';
import {getDoc, doc} from 'firebase/firestore';

import { MachineInfo } from './components/MachineInfo/MachineInfo';
import { BinCapacity } from './components/BinCapacity/BinCapacity';
import { DetectionList } from './components/DetectionList/DetectionList';

const Machine = () => {
    const { machineID } = useParams();
    const [machine, setMachine] = useState([{}]);

    useEffect(() => {
        const getMachine = async () => {
            const machineDoc = await getDoc(doc(machinesRef, machineID));
            const machineData = await machineDoc.data();
            setMachine(machineData);
        };
        getMachine();
    }, []);
    return (
        <div>
            <MachineInfo props={ machine.machineInfo } />
            <BinCapacity props={ machine.binCapacity } />
            <DetectionList props={ {machineID: machineID} } />

        </div>
    );

};

export default Machine;
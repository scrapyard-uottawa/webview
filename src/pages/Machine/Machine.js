import { useParams } from 'react-router-dom';
import { machinesRef, db  } from '../../App';
import { doc,getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";



const Machine = async () => {
    const { machineID } = useParams();

    const [machineInfo, setMachineInfo] = useState([]);
    
    useEffect(() => {
        const getMachine = async () => {
            const docRef = doc(db, "machines", machineID);
            const docSnap = await getDoc(docRef);

            setMachineInfo(null);
        };
        getMachine();
    }, []);





    return (
        <div>
            <h1>Machine</h1>
            <p>{machineInfo.name}</p>
        </div>
    );
};

export default Machine;
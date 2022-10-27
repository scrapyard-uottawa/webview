import { useEffect, useState } from "react";
import { db } from "../../../../App";
import { getDocs, collection } from "firebase/firestore";

import { DetectionCard } from "../DetectionCard/DetectionCard";

export const DetectionList = ({ props }) => {
    const machineID = props.machineID;; 

    const [detections, setDetections] = useState([{}]);
    useEffect(() => {
        const getDetections = async () => {
            const detectionsRef = collection(db,"machines", machineID, "detections");
            const detectionsSnapshot = await getDocs(detectionsRef);
            const detectionsList = detectionsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(detectionsList);
            setDetections(detectionsList);
        };
        getDetections();
    }, []);


    return (
        <div className="detection-list">
            <h1>Detections</h1>
            {detections.map((detection) => (
               <DetectionCard props={detection} />
            ))}

        </div>
    );
}

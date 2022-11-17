import { useEffect, useState } from "react";
import { db } from "../../../../App";
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { DetectionCard } from "../DetectionCard/DetectionCard";

export const DetectionList = ({ props }) => {
    const machineID = props.machineID;;

    const [detections, setDetections] = useState([{}]);
    useEffect(() => {
        const getDetections = async () => {
            const detectionsRef = collection(db, "machines", machineID, "detections");
            const detectionsSnapshot = await getDocs(query(detectionsRef,orderBy('timeStamp','desc')));
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
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Image</th>
                        <th scope="col">TimeStamp</th>
                        <th scope="col">machineLearningConfidence</th>
                        <th scope="col">wasteType</th>
                    </tr>
                </thead>
                <tbody>
                
                {detections.map((detection) => (    
                    <DetectionCard props={detection} />
                ))}
                </tbody>
                </table>
        </div>
    );
}

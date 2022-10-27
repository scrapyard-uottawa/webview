import './DetectionCard.css';

export const DetectionCard = ({ props }) => {
    if (!props) return <p>Data has not been loaded.</p>;

    return (
      
            <tr>
                <th>{props.id}</th>
                <td> <img src={props.capturedImage} alt="detection picture" /></td>
                <td>DATA MISSING</td>
                <td> {props.machineLearningConfidence}</td>
                <td>{props.wasteType}</td>
            </tr>
           
        
    );
}

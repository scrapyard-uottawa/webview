import './DetectionCard.css';

export const DetectionCard = ({ props }) => {
    if (!props) return <p>Data has not been loaded.</p>;

    return (
      
            <tr>
                <a href={props.capturedImage} target="_blank">
                <th>{props.id}</th>
                </a>
                <td> <img src={props.capturedImage} alt="detection picture" /></td>
                <td>DATA MISSING</td>
                <td> {props.machineLearningConfidence}</td>
                <td>{props.wasteType}</td>
            </tr>
           
        
    );
}

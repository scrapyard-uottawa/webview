
export const DetectionCard = ({ props }) => {
    if (!props) return <p>Data has not been loaded.</p>;

    return (
        <div className="detection-card">
            <p>{props.id}</p>
            <img src={props.capturedImage} alt="detection picture" />
            <p>timeStamp: {props.timeStamp.nanoseconds}</p>
            <p>machineLearningConfidence: {props.machineLearningConfidence}</p>
            <p>wasteType: {props.wasteType}</p>
        </div>
    );
}

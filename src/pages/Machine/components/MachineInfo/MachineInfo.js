export const MachineInfo = ({props}) => {
    if (!props) return <p>Data has not been loaded.</p>;
    return (
        <div className="machine-info">
            <h1>Machine Info</h1>
            <p>{props.locationName}</p>
            <p>{props.locationCord.latitude}, {props.locationCord.longitude}</p>
        </div>
    );
};

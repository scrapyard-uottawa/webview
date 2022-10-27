

export const MachineInfo = ({ machineInfo }) => {
    console.log(machineInfo);
    return (
        <div className="machine-info">
            <h1>Machine Info</h1>
            <p>{machineInfo.locationName}</p>
        </div>
    );
};

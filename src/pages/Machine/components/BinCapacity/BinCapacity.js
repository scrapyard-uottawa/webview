
export const BinCapacity = ({ props }) => {
    // if the props are not defined, return null
    if (!props) return <p>Data has not been loaded.</p>;
    return (
        <div className="bin-capacity">
            <h1>Bin Capacity</h1>
            <p>Black Bin: {props.blackBin}%</p>
            <p>Blue Bin: {props.blueBin}%</p>
            <p>Compost: {props.compost}%</p>
            <p>Garbage: {props.garbage}%</p>
        </div>
    );
}

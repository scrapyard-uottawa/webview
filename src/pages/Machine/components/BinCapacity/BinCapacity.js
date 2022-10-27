import './BinCapacity.css';
export const BinCapacity = ({ props }) => {
    // if the props are not defined, return null
    if (!props) return <p>Data has not been loaded.</p>;
    return (
        <div className="bin-capacity">
            <table>
            <h1>Bin Capacity</h1>
            <tr>
                <th>Black Bin</th>
                <th>Blue Bin</th>
                <th>Compost</th>
                <th>Garbage</th>
            </tr>
            <tr>
                <td>{props.blackBin}%</td>
                <td>{props.blueBin}%</td>
                <td>{props.compost}%</td>
                <td>{props.garbage}%</td>
            </tr>
            </table>
        </div>
    );
}

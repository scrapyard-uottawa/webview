import './BinCapacity.css';
import { PieChart } from 'react-minimal-pie-chart';

export const BinCapacity = ({ props }) => {
    // if the props are not defined, return null
    if (!props) return <p>Data has not been loaded.</p>;

    let capacityBlackBin = Math.round(props.blackBin * 100) / 100;
    let capacityBlueBin = Math.round(props.blueBin * 100) / 100;
    let capacityCompost = Math.round(props.compost * 100) / 100;
    let capacityGarbage = Math.round(props.garbage * 100) / 100;

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
                <td>{capacityBlackBin}%</td>
                <td>{capacityBlueBin}%</td>
                <td>{capacityCompost}%</td>
                <td>{capacityGarbage}%</td>
            </tr>
            <tr>
                <td><PieChart
                    data={[{ value: (capacityBlackBin), color: '#000000' }]}
                    totalValue={100}
                    lineWidth={20}
                    label={({ dataEntry }) => dataEntry.value}
                    labelStyle={{
                    fontSize: '25px',
                    fontFamily: 'sans-serif',
                    fill: '#000000',
                    }}
                    labelPosition={0}
                />
                </td>
                <td><PieChart
                    data={[{ value: (capacityBlueBin), color: '#2B65EC' }]}
                    totalValue={100}
                    lineWidth={20}
                    label={({ dataEntry }) => dataEntry.value}
                    labelStyle={{
                    fontSize: '25px',
                    fontFamily: 'sans-serif',
                    fill: '#2B65EC',
                    }}
                    labelPosition={0}
                />
                </td>
                <td><PieChart
                    data={[{ value: (capacityCompost), color: '#2A6D4C' }]}
                    totalValue={100}
                    lineWidth={20}
                    label={({ dataEntry }) => dataEntry.value}
                    labelStyle={{
                    fontSize: '25px',
                    fontFamily: 'sans-serif',
                    fill: '#2A6D4C',
                    }}
                    labelPosition={0}
                />
                </td>
                <td><PieChart
                    data={[{ value: (capacityGarbage), color: '#808080' }]}
                    totalValue={100}
                    lineWidth={20}
                    label={({ dataEntry }) => dataEntry.value}
                    labelStyle={{
                    fontSize: '25px',
                    fontFamily: 'sans-serif',
                    fill: '#808080',
                    }}
                    labelPosition={0}
                />
                </td>
            </tr>
            </table>
            
        </div>
        
    );
}

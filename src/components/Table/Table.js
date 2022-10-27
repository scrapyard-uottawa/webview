import React from 'react'
import './Table.css';

function Table(props) {
  return ( 
    <div className="tableBorder">
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Identified Name</th>
                    <th>Confidence %</th>
                    <th>Type of Garbage</th>
                    <th>Time and Date</th>
                </tr>
            </thead>
            <tbody>
                {props.garbage.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td><img src={item.imgLink} alt="imgLink" className="imgLink"/></td>
                            <td>{item.name}</td>
                            <td>{item.confidence}%</td>
                            <td>{item.grbgType}</td>
                            <td>{item.dateTime}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )
}

export default Table
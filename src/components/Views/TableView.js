import React, { Component } from 'react';
import Table from '../Table/Table';
import Garbage from '../Garbage/Garbage';

class TableView extends Component {
    state = { 
        garbage: [
            {
                imgLink: "https://www.kindpng.com/picc/m/33-333845_crushed-coke-can-hd-png-download.png",
                confidence: 93,
                grbgType: "Recycling",
                dateTime: "2021-09-26 23:59:59",
                name: "Coca-Cola Can"
            },
            {
                imgLink: "https://www.gannett-cdn.com/presto/2022/02/23/USAT/d69ab796-0f44-460f-a22f-e9de98f4b13b-GettyImages-1008019300.jpg",
                confidence: 72,
                grbgType: "Compost",
                dateTime: "2022-07-28 16:20:00",
                name: "Bananana Peel"
            },
            {
                imgLink: "http://www.onegreenplanet.org/wp-content/uploads//2012/10/Paper-Waste-Go-Paperless.jpeg",
                confidence: 54,
                grbgType: "Paper",
                dateTime: "2022-04-13 13:46:54",
                name: "Paper"
            },
            {
                imgLink: "https://media.istockphoto.com/photos/trashed-coffee-to-go-cups-waste-on-white-isolated-background-picture-id1295788954?k=20&m=1295788954&s=612x612&w=0&h=MRySThheLgERWLlqb7JxVxIb5dUATHSEZ90zX4Dkwm4=",
                confidence: 100,
                grbgType: "Trash",
                dateTime: "2022-03-01 12:05:34",
                name: "Coffee Cup"
            }
        ]
     }
    render() { 
        return ( 
            <div className="tableView">
                <Table garbage={this.state.garbage}/>
            </div>
         );
    }
}

export default TableView;
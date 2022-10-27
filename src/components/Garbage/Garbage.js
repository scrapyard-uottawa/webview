class Garbage {
    state = { 
        imgLink: "",
        confidence: 0,
        grbgType: ["Recycling", "Compost", "Paper", "Trash"],
        dateTime: "",
        name: ""
     }
    render() { 
        return ( 
            <div className="garbage">
                <h1>{this.state.name}</h1>
                <h2>{this.state.dateTime}</h2>
                <img src={this.state.imgLink} alt="imgLink" className="imgLink"/>
                <h3>{this.state.confidence}%</h3>
                <h2 className="grbgType">{this.state.grbgType}</h2>
            </div>
         );
    }
}
 
export default Garbage;
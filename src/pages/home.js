import React, { Component } from "react";
import $ from 'jquery';

import '../style.css';

export function PointHistory(props) {
    return (
        <div className="point_history_tile">
            <h5>Change in: {props.when}</h5>
            <p>Modification: {props.change}</p>
        </div>
    );
}

export function AgendaTile(props){
    return (
        <li onClick={props.handleAgendaClick} className="list-item section" data-target={"section"+props.num}>{props.name}</li>
    )
}

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {section:0,point:0}
        this.data = [{num:1,name:'Section 1',points:[
            {num:1,changes:[
                {when:"51st Senate Meeting",change:"SFDSFSDGDFGHFDGFDG"},
                {when:"49st Senate Meeting",change:";lkSFsdfsdfsdfsdfsdfDG"},
                {when:"48st Senate Meeting",change:"jkkSsdfsdfsdfsdfsdfsdfsfsdfsdfGFDG"},
                {when:"46st Senate Meeting",change:"sdfsdfSsdfsdfdsfsdfsdfsdfDG"},
            ]},
            {num:2,changes:[
                {when:"53st Senate Meeting",change:"sfsdSFDSFSDGDFGHFDGFDG"},
                {when:"48st Senate Meeting",change:"QQRWasdasdasdasdasSDAFSASDFfDG"},
                {when:"47st Senate Meeting",change:"QWRWQRSDFGSDFSDFSsdfsdfsdSDFSDFSDfsdfsdfsdfsfsdfsdfGFDG"},
                {when:"45st Senate Meeting",change:"FDHHDFGHSsdfsdfdsfsdfsdfsdfDG"},
            ]},
            {num:3,changes:[{when:"51st Senate Meeting",change:"SFDSFSDGDFGHFDGFDG"}]},
            {num:4,changes:[{when:"51st Senate Meeting",change:"SFDSFSDGDFGHFDGFDG"}]},
            {num:5,changes:[{when:"51st Senate Meeting",change:"SFDSFSDGDFGHFDGFDG"}]},
        ]},
        {num:2,name:'Section 2',points:[1,2,3]},
        {num:3,name:'Section 3',points:[1,2,3,4]},
        {num:4,name:'Section 4',points:[1,2,3,4,5,6]},
        {num:5,name:'Section 5',points:[1,2]}]
    }

    

   
    

    handleAgendaClick = (e) => {
        // console.log(e.target.dataset.target.split("_"))
        this.setState({
            section:Number(e.target.dataset.target.split("_").slice(-1)),
            point:0
        })
    }

    handlePointClick = (e) => {
        
        this.setState({
            point:Number(e.target.dataset.target.split("_").slice(-1))
        })
        console.log(this.state)
    }

    render() {
      return (<div className="home-cont">
      <div className="col-sm-3 agenda-menu left-pane">
      {/* <button className="btn mb-3" data-target="create-agenda">Create New Agenda</button> */}
      <h2>Handbook Sections</h2>
      <ul className="list-group">
            {
                this.data.map((val) => {
                    return <li onClick={this.handleAgendaClick} className="list-item section clickable" data-target={"section_"+val.num}>{val.name}</li>
                })
            }
      </ul>
    </div>

    <div className="col-sm-3 seection-submenu center-pane">
        {this.state.section !=0 && <h2>Hanbook Points</h2>}
        {this.data.map((val,id) => {
            return (
                
                this.state.section == val.num && 
                <ul id={"section_"+id} className="list-group">
                    {val.points.map((det,id) => {
                        return (
                            <li  onClick={this.handlePointClick} className="list-item section-point clickable" data-target={"section-pt_"+det.num}>Handbook Point {det.num}</li>
                        )
                    })}

                </ul>)
        })
        }

    </div>

    <div className="col-sm-6 changes-data">
      {/* <pointHistory className="test">Hello</pointHistory> */}
        {this.state.section !=0 && this.state.point != 0 && <h2>Version History</h2>}
      {this.data.map((val) => {
        return (
            val.points.map((pt) => {
                return (
                    this.state.section == val.num && this.state.point == pt.num &&
                    pt.changes.map((ch) => {
                        return (
                            <PointHistory when={ch.when} change={ch.change}></PointHistory>
                        )
                    })
                )
            })
        )
      })}

    </div>
</div>);
    }
  }
  export default Home;
import React, { Component } from "react";
import { Placeholder } from "./updateHandbook";
import Collapsible from "react-collapsible";
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


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
        <li onClick={props.handleAgendaClick} className="list-item agenda" data-target={"agenda"+props.num}>{props.name}</li>
    )
}





// export function


class SenateDecisions extends Component {
    constructor(props){
        super(props);
        this.state = {senate:0,point:0,sen_pt:0}
        // this.data = [{num:1,name:'Agenda 1',points:[
        //     {num:1,changes:[
        //         {when:"51st Senate Meeting",change:"SFDSFSDGDFGHFDGFDG"},
        //         {when:"49st Senate Meeting",change:";lkSFsdfsdfsdfsdfsdfDG"},
        //         {when:"48st Senate Meeting",change:"jkkSsdfsdfsdfsdfsdfsdfsfsdfsdfGFDG"},
        //         {when:"46st Senate Meeting",change:"sdfsdfSsdfsdfdsfsdfsdfsdfDG"},
        //     ]},
        //     {num:2,changes:[
        //         {when:"53st Senate Meeting",change:"sfsdSFDSFSDGDFGHFDGFDG"},
        //         {when:"48st Senate Meeting",change:"QQRWasdasdasdasdasSDAFSASDFfDG"},
        //         {when:"47st Senate Meeting",change:"QWRWQRSDFGSDFSDFSsdfsdfsdSDFSDFSDfsdfsdfsdfsfsdfsdfGFDG"},
        //         {when:"45st Senate Meeting",change:"FDHHDFGHSsdfsdfdsfsdfsdfsdfDG"},
        //     ]},
        //     {num:3,changes:[{when:"51st Senate Meeting",change:"SFDSFSDGDFGHFDGFDG"}]},
        //     {num:4,changes:[{when:"51st Senate Meeting",change:"SFDSFSDGDFGHFDGFDG"}]},
        //     {num:5,changes:[{when:"51st Senate Meeting",change:"SFDSFSDGDFGHFDGFDG"}]},
        // ]},
        // {num:2,name:'Agenda 2',points:[1,2,3]},
        // {num:3,name:'Agenda 3',points:[1,2,3,4]},
        // {num:4,name:'Agenda 4',points:[1,2,3,4,5,6]},
        // {num:5,name:'Agenda 5',points:[1,2]}]

        this.data = [{num:3,name:'Agenda 5',points:[
            {num:1,name:"Ag Pt 1", has_subpoints:true, subpoints:[
                {num:1,name:"Subpoint 1"},
                {num:2,name:"Subpoint 2"},
                {num:3,name:"Subpoint 3"},
            ]},
            {num:1,name:"Ag Pt 2", has_subpoints:true, subpoints:[

            ]},
            {num:1,name:"Ag Pt 2", has_subpoints:false}
        ]},
        {num:2,name:'Agenda 2',points:[
            {num:1,name:"Ag Pt 1", has_subpoints:true, subpoints:[
                {num:1,name:"Subpoint 1"},
                {num:2,name:"Subpoint 2"},
            ]},
            {num:1,name:"Ag Pt 2", has_subpoints:true, subpoints:[
                {num:1,name:"Subpoint 1"},
                {num:2,name:"Subpoint 2"},
                {num:2,name:"Subpoint 3"},
            ]},
        ]},]
    }

    
    SenateDecisionForm = (props) => {
      return (
          <form className="sen_dec_form">
              <label for="sen_dec_prop" class="form-label">Proposal</label>
              <textarea readOnly={true} type="text" class="form-control" id="sen_dec_prop" placeholder="Proposal for the Senate Point"></textarea>
              <label for="sen_dec_res" class="form-label">Resolution</label>
              <textarea type="text" class="form-control" id="sen_dec_res" placeholder="Resolution for the Senate Point"></textarea>
        
              {/* <textarea placeholder="Comments"></textarea> */}
              <div>
                  <button className="btn btn-success">Approve</button>
                  <button className="btn btn-danger">Reject</button>
              </div>
          </form>
      )
  }

   
    

    handleSenatePointClick = (e) => {
        // console.log(e.target.dataset.target.split("_"))
        this.setState({
            sen_pt:Number(e.target.dataset.target.split("_").slice(-1)),
            section:0,
            point:0
        })
    }

    handleSenateClick = (e) => {
        this.setState({
            senate: Number(e.target.dataset.target.split("_").slice(-1)),
            point: 0
        })
    }

    
    handlePointClick = (e) => {

        this.setState({
            point: Number(e.target.dataset.target.split("_").slice(-1))
        })
    }


    render() {
      return (<div className="sen-dec-cont">
      <div className="col-sm-3 left-pane">
      <h2>Agendas</h2>
      <ul className="list-group">
            {
                this.data.map((val) => {
                    return <li data-active={this.state.senate == val.num} onClick={this.handleSenateClick} className="list-item agenda clickable" data-target={"sen_dec_pt_"+val.num}>{val.name}</li>
                })
            }
      </ul>
    </div>

    <div className="col-sm-3 agenda-submenu center-pane">
                {this.state.senate !== 0 && <React.Fragment> 
                    <DropdownButton onSelect={(e) => console.log(e)} as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
                        <Dropdown.Item eventKey="1">Delete Selected Agenda</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Finalise Agenda for Senate</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Rename Selected Agenda</Dropdown.Item>
                    </DropdownButton>
                     <h2>Agenda Points</h2></React.Fragment>}
                {this.data.map((val, id) => {
                    return (
                        this.state.senate === val.num &&
                        <ul id={"agenda_" + id} className="list-group">
                            {val.points.map((det, id) => {
                                return (
                                    det.has_subpoints ?
                                        (<Collapsible trigger={det.name}>
                                            {
                                                det.subpoints.map((sp) => {
                                                    return (
                                                        <li data-active={this.state.point === det.num} onClick={this.handlePointClick} className="list-item agenda-point clickable" data-target={"agenda-pt_" + sp.num}>Handbook Sub Point {sp.num}</li>
                                                    )
                                                })
                                            }
                                        </Collapsible>)

                                        : <li data-active={this.state.point === det.num} onClick={this.handlePointClick} className="list-item agenda-point clickable" data-target={"agenda-pt_" + det.num}>{det.name}</li>

                                )
                            })}

                        </ul>
                    )
                })
                }

            </div>


    <div className="col-sm-6 right-pane">
        {
          this.state.point != 0 ?
          <this.SenateDecisionForm /> :
          <Placeholder text="senate point" feature="take a decision on it" />
        }
      {/* <pointHistory className="test">Hello</pointHistory> */}
      {/* {this.data.map((val) => {
        return (
            val.points.map((pt) => {
                return (
                    this.state.senate == val.num && this.state.point == pt.num &&
                    pt.changes.map((ch) => {
                        return (
                            <PointHistory when={ch.when} change={ch.change}></PointHistory>
                        )
                    })
                )
            })
        )
      })} */}

    </div>
</div>);
    }
  }
  export default SenateDecisions;
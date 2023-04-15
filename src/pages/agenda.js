import React, { Component } from "react";


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

export function AgendaPointCreateForm(props){
    return (
        <form className="ag_pt_create_form">
            <label for="ag_pt_new_prop" class="form-label">Proposal</label>
            <input type="text" class="form-control" id="ag_pt_new_prop" placeholder="Proposal for the Agenda Point"></input>
            <div>
                <button className="btn btn-success">Create</button>
                <button className="btn btn-danger">Cancel</button>
            </div>
        </form>
    )
}

export function AgendaPointView(props){
    return (
        <form className="ag_pt_view">
            <label for="ag_pt_view_prop" class="form-label">Proposal</label>
            <input readOnly={true} type="text" class="form-control" id="ag_pt_view_prop" placeholder="Proposal for the Agenda Point"></input>
            <div>
                <button className="btn btn-success">Add Subpoint</button>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Delete</button>
            </div>
        </form>
    )
}

// export function


class Agenda extends Component {
    constructor(props){
        super(props);
        this.state = {agenda:0,point:0}
        this.data = [{num:1,name:'Agenda 1',points:[
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
        {num:2,name:'Agenda 2',points:[1,2,3]},
        {num:3,name:'Agenda 3',points:[1,2,3,4]},
        {num:4,name:'Agenda 4',points:[1,2,3,4,5,6]},
        {num:5,name:'Agenda 5',points:[1,2]}]
    }

    

   
    

    handleAgendaClick = (e) => {
        // console.log(e.target.dataset.target.split("_"))
        this.setState({
            agenda:Number(e.target.dataset.target.split("_").slice(-1)),
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
      return (<div className="agenda-cont">
      <div className="col-sm-3 agenda-menu left-pane">
      <button className="btn mb-3" data-target="create-agenda">Create New Agenda</button>
      <h2>Agendas</h2>
      <ul className="list-group">
            {
                this.data.map((val) => {
                    return <li onClick={this.handleAgendaClick} className="list-item agenda clickable" data-target={"agenda_"+val.num}>{val.name}</li>
                })
            }
      </ul>
    </div>

    <div className="col-sm-3 agenda-submenu center-pane">
        {this.state.agenda != 0 && <React.Fragment> <button className="btn mb-3" data-target="create-agenda">New Agenda Point</button> <h2>Agenda Points</h2></React.Fragment>}
        {this.data.map((val,id) => {
            return (
                this.state.agenda == val.num && 
                <ul id={"agenda_"+id} className="list-group">
                    {val.points.map((det,id) => {
                        return (
                            <li  onClick={this.handlePointClick} className="list-item agenda-point clickable" data-target={"agenda-pt_"+det.num}>Handbook Point {det.num}</li>
                        )
                    })}

                </ul>
                )
        })
        }

    </div>

    <div className="col-sm-6 changes-data pt-5">
        <AgendaPointCreateForm/>
        <AgendaPointView/>
      {/* <pointHistory className="test">Hello</pointHistory> */}
      {this.data.map((val) => {
        return (
            val.points.map((pt) => {
                return (
                    this.state.agenda == val.num && this.state.point == pt.num &&
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
  export default Agenda;
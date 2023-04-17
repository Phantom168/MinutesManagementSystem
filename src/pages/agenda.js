import React, { Component } from "react";
import Collapsible from "react-collapsible";
import { Placeholder } from "./updateHandbook";
import { getSenateMeetingAllAPI, getSenatePointsAllAPI, getSenatePointsIdAPI, getSenatePointsMeetingIdAPI, addSenateMeetingAPI, addSenatePointAPI, } from '../api/senateMeeting'

export function PointHistory(props) {
    return (
        <div className="point_history_tile">
            <h5>Change in: {props.when}</h5>
            <p>Modification: {props.change}</p>
        </div>
    );
}



export function AgendaTile(props) {
    return (
        <li onClick={props.handleAgendaClick} className="list-item agenda" data-target={"agenda" + props.num}>{props.name}</li>
    )
}

export function AgendaPointCreateForm(props) {
    return (<div>

        <label for="ag_pt_new_prop" class="form-label">Proposal</label>
        <input type="number" class="form-control" id="ag_pt_new_prop" placeholder="Enter point number" onChange={props.handleChangenumber}></input>

        <input type="text" class="form-control" id="ag_pt_new_prop" placeholder="Proposal for the Agenda Point" onChange={props.handleChangeProposal}></input>
        <input type="text" class="form-control" id="ag_pt_new_prop" placeholder="Resolution for the Agenda Point" onChange={props.handleChangeresolution}></input>

        <div>
            <button className="btn btn-success" onClick={props.handleClickCreate}>Create</button>
            <button className="btn btn-danger" onClick={props.handleClickCancel}>Cancel</button>
        </div>
    </div>

    )
}


export function AgendaPointView(props) {
    return (
        <form className="ag_pt_view">
            <label for="ag_pt_view_prop" class="form-label">Proposal</label>
            <input readOnly={true} type="text" class="form-control" id="ag_pt_view_prop" placeholder={props.name} ></input>
            <input readOnly={true} type="text" class="form-control" id="ag_pt_view_prop" placeholder={props.resolution}></input>
            {/*             
            <div>
                <button className="btn btn-success">Add Subpoint</button>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger">Delete</button>
            </div> */}
        </form>
    )
}

// export function


class Agenda extends Component {
    constructor(props) {
        super(props);
        this.state = { agenda: 0, point: 0, subpoint: 0, pointdata: {}, editing_point: false, newpoint: 0, proposal: '', number: 0, resolution: '', data: [] }
        this.handleClickCreate = this.handleClickCreate.bind(this);
        // this.state.data = [{num:3,name:'Agenda 5',points:[
        //     {num:1,name:"Ag Pt 1", has_subpoints:true, subpoints:[
        //         {num:1,name:"Subpoint 1"},
        //         {num:2,name:"Subpoint 2"},
        //         {num:3,name:"Subpoint 3"},
        //     ]},
        //     {num:1,name:"Ag Pt 2", has_subpoints:true, subpoints:[

        //     ]},
        //     {num:1,name:"Ag Pt 2", has_subpoints:false}
        // ]},
        // {num:2,name:'Agenda 2',points:[
        //     {num:1,name:"Ag Pt 1", has_subpoints:true, subpoints:[
        //         {num:1,name:"Subpoint 1"},
        //         {num:2,name:"Subpoint 2"},
        //     ]},
        //     {num:1,name:"Ag Pt 2", has_subpoints:true, subpoints:[
        //         {num:1,name:"Subpoint 1"},
        //         {num:2,name:"Subpoint 2"},
        //         {num:2,name:"Subpoint 3"},
        //     ]},
        // ]},]
    }




    async componentWillMount() {

        const response = await getSenateMeetingAllAPI();

        const Meeting = response.body;
        const new_data = []

        for (let i = 0; i < Meeting.length; i++) {
            const pointsArray = []
            const res2 = await getSenatePointsMeetingIdAPI(Meeting[i].number)
            for (const points of res2.body.senatePoints) {
                // const changes = []
                // console.log("points", points)
                // const subPoints = points.subPoints;
                // if (subPoints.length === 0) {

                // }
                // console.log("versionHistory", versionHistory)
                // for (const version of versionHistory) {
                //     const version_data = await getSenatePointsIdAPI(version);
                //     console.log("version_data", version_data)
                //     changes.push({
                //         when: `${version_data.body.senateMeeting} Senate Meeting`,
                //         change: version_data.body.handbookPointNewText
                //     })
                // }
                pointsArray.push({
                    num: points.number,
                    name: points.proposal,
                    has_subpoints: false
                })
            }

            new_data.push({
                num: Meeting[i].number,
                name: Meeting[i].announcement,
                points: pointsArray

            })
        };

        this.setState({
            data: new_data
        }, this.forceUpdate())



    }



    handleAgendaClick = (e) => {
        this.setState({
            agenda: Number(e.target.dataset.target.split("_").slice(-1)),
            point: 0
        })
    }

    handlePointClick = (e) => {

        this.setState({
            point: Number(e.target.dataset.target.split("_").slice(-1))
        })
    }


    handleChangeProposal = (e) => {
        this.setState({ proposal: e.target.value })
    }

    handleChangenumber = (e) => {
        this.setState({ number: e.target.value })
    }
    handleChangeresolution = (e) => {
        this.setState({ resolution: e.target.value })
    }

    async handleClickCreate(e) {

        await addSenatePointAPI(this.state.number, this.state.proposal, this.state.resolution, this.state.agenda)
        window.location.reload(false);

    }

    handleClickCancel = () => {
        this.setState({ newpoint: 0 })
    }

    handlenewpoint = () => {
        this.setState({ newpoint: 1 })
    }

    render() {
        return (<div className="agenda-cont">
            <div className="col-sm-3 agenda-menu left-pane">
                <button className="btn mb-3" data-target="create-agenda">Create New Agenda</button>
                <h2>Agendas</h2>
                <ul className="list-group">
                    {
                        this.state.data.map((val) => {
                            return <li data-active={this.state.agenda === val.num} onClick={this.handleAgendaClick} className="list-item agenda clickable" data-target={"agenda_" + val.num}>{val.name}</li>
                        })
                    }
                </ul>
            </div>

            <div className="col-sm-3 agenda-submenu center-pane">
                {this.state.agenda !== 0 && <React.Fragment> <button className="btn mb-3" data-target="create-agenda" onClick={this.handlenewpoint}>New Agenda Point</button> <h2>Agenda Points</h2></React.Fragment>}
                {this.state.data.map((val, id) => {
                    return (
                        this.state.agenda === val.num &&
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

            <div className="col-sm-6 changes-data pt-5">
                {
                    this.state.point === 0 ? (this.state.agenda === 0 ?
                        <Placeholder text="agenda and point" feature="view/edit" /> :
                        (this.state.newpoint === 1 ? <AgendaPointCreateForm handleChangeProposal={this.handleChangeProposal}
                            handleChangeresolution={this.handleChangeresolution}
                            handleChangenumber={this.handleChangenumber}
                            handleClickCreate={this.handleClickCreate}
                            handleClickCancel={this.handleClickCancel}

                        /> : <Placeholder text="point" feature="view/edit" />)
                    ) :
                        // <AgendaPointView />
                        null
                }





                {/* <pointHistory className="test">Hello</pointHistory> */}
                {this.state.data?.map((val) => {
                    return (
                        val.points?.map((pt) => {
                            return (
                                this.state.agenda === val.num && this.state.point === pt.num &&
                                pt.changes?.map((ch) => {
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
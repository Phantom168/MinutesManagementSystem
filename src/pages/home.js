import React, { Component } from "react";
import { getHandbookSectionAPI, getHandbookPointsSectionIdAPI, deleteHandbookSectionAPI,deleteHandbookPointAPI } from '../api/handbook'
import { getSenatePointsIdAPI } from '../api/senateMeeting'
import '../style.css';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
var parse = require('html-react-parser');

export function PointHistory(props) {
    return (
        <div className="point_history_tile">
            <h5>Change in: {props.when}</h5>
            {parse(props.change)}
        </div>
    );
}

export function AgendaTile(props) {
    return (
        <li onClick={props.handleAgendaClick} className="list-item section" data-target={"section" + props.num}>{props.name}</li>
    )
}

// eslint-disable-next-line no-undef



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { section: 0, point: 0, data: [], deleteSectionopen : false, deletePointopen : false }
    }


    async getData() {



        const response = await getHandbookSectionAPI();
        const section = response.body.results;
        const new_data = []

        for (let i = 0; i < section.length; i++) {
            const pointsArray = []
            const res2 = await getHandbookPointsSectionIdAPI(section[i].number);
            for (const points of res2.body.handbookPoints) {
                const changes = []
                const versionHistory = points.versionHistory;
                const pointsId = points.id;
                if (versionHistory.length === 0) {
                    changes.push({
                        when: "Original Point",
                        change: points.text,
                    })
                }
                for (const version of versionHistory) {
                    const version_data = await getSenatePointsIdAPI(version);
                    changes.push({
                        when: `${version_data.body.senateMeeting} Senate Meeting`,
                        change: version_data.body.handbookPointNewText
                    })
                }
                pointsArray.push({
                    num: points.number,
                    changes: changes,
                    id:pointsId,
                })
            }

            new_data.push({
                num: section[i].number,
                name: section[i].name,
                points: pointsArray

            })


        };

        this.setState({
            data: new_data
        }, this.forceUpdate())


    }

    async componentWillMount() {
        this.getData();

    }

    async handleDeleteSection(section, e) {
        console.log(section)
        await deleteHandbookSectionAPI(section);
        this.setState({
            section: 0
        })

        this.getData();
        this.setState({
            deleteSectionopen : true
        })
    }

    async handleDeletePoint(point, e){
        console.log(point);
        await deleteHandbookPointAPI(point);
        this.setState({
            point : 0
        })

        this.getData();
        this.setState({
            deletePointopen : true
        })


    }

    handleAgendaClick = (e) => {
        console.log(Number(e.target.dataset.target.split("_").slice(-1)))
        this.setState({
            section: Number(e.target.dataset.target.split("_").slice(-1)),
            point: 0
        })
    }

    handlePointClick = (e) => {

        this.setState({
            point: Number(e.target.dataset.target.split("_").slice(-1))
        })
    }

    setdeleteSectionopen = (open) => {
        this.setState({
            deleteSectionopen : open
        })
    }


    setdeletePointopen = (open) => {
        this.setState({
            deletePointopen : open
        })
    }
    render() {
        return (
        
        
        
        <div className="home-cont">

<Snackbar open={this.state.deleteSectionopen} autoHideDuration={6000} onClose={() => { this.setdeleteSectionopen(false); }}>
                <Alert onClose={() => { this.setdeleteSectionopen(false); }} severity="success" sx={{ width: '100%' }}>
                   Senate Section Deleted!
                </Alert>
            </Snackbar>


            <Snackbar open={this.state.deletePointopen} autoHideDuration={6000} onClose={() => { this.setdeletePointopen(false); }}>
                <Alert onClose={() => { this.setdeletePointopen(false); }} severity="success" sx={{ width: '100%' }}>
                   Senate Point Deleted!
                </Alert>
            </Snackbar>

            <div className="col-sm-3 agenda-menu left-pane">
                {/* <button className="btn mb-3" data-target="create-agenda">Create New Agenda</button> */}
                <h2>Handbook Sections</h2>
                <ul className="list-group">
                    {
                        this.state.data?.map((val) => {
                            return <li data-active={this.state.section === val.num} onClick={this.handleAgendaClick} className="list-item section clickable" data-target={"section_" + val.num}>{val.name}</li>
                        })
                    }
                </ul>
            </div>

            <div className="col-sm-3 section-submenu center-pane">
                {this.state.section !== 0 && <React.Fragment>
                    <button className="btn btn-danger" onClick={(e) => this.handleDeleteSection(this.state.section, e)}>Delete Selected Section</button>
                    <h2>Handbook Points</h2>
                </React.Fragment>}
                {this.state.data?.map((val, id) => {
                    return (

                        this.state.section === val.num &&
                        <ul id={"section_" + id} className="list-group">
                            {val.points?.map((det, id) => {
                                return (
                                    <li data-active={this.state.point === det.id} onClick={this.handlePointClick} className="list-item section-point clickable" data-target={"section-pt_" + det.id}>Handbook Point {det.num}</li>
                                )
                            })}

                        </ul>)
                })
                }

            </div>

            <div className="col-sm-6 home-right-pane changes-data">
                {/* <pointHistory className="test">Hello</pointHistory> */}
                {this.state.section !== 0 && this.state.point !== 0 && <React.Fragment>
                    <div className="btn-container">
                        <button className="btn btn-danger" onClick={(e) => this.handleDeletePoint(this.state.point, e)}>Delete Selected Point</button>
                    </div>
                    <h2>Version History</h2>
                </React.Fragment>}
                {this.state.data?.map((val) => {
                    return (
                        val.points?.map((pt) => {
                            return (
                                this.state.section === val.num && this.state.point === pt.id &&
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
export default Home;
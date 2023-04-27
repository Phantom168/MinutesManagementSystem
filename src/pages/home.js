import React, { Component } from "react";
import { getHandbookSectionAPI, getHandbookPointsSectionIdAPI } from '../api/handbook'
import { getSenatePointsIdAPI } from '../api/senateMeeting'
import '../style.css';

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
        <li onClick={props.handleAgendaClick} className="list-item section" data-target={"section" + props.num}>{props.name}</li>
    )
}

// eslint-disable-next-line no-undef



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { section: 0, point: 0, data: [] }
    }


    async componentWillMount() {

        const response = await getHandbookSectionAPI();
        const section = response.body;
        const new_data = []

        for (let i = 0; i < section.length; i++) {
            const pointsArray = []
            const res2 = await getHandbookPointsSectionIdAPI(section[i].number)
            for (const points of res2.body.handbookPoints) {
                const changes = []
                const versionHistory = points.versionHistory;
                if (versionHistory.length === 0) {
                    changes.push({
                        when: "Original Point",
                        change: points.text
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
                    changes: changes
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


    handleAgendaClick = (e) => {
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

    render() {
        return (<div className="home-cont">
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
                    <button className="btn btn-danger">Delete Selected Section</button> 
                    <h2>Handbook Points</h2>
                    </React.Fragment>}
                {this.state.data?.map((val, id) => {
                    return (

                        this.state.section === val.num &&
                        <ul id={"section_" + id} className="list-group">
                            {val.points?.map((det, id) => {
                                return (
                                    <li data-active={this.state.point === det.num} onClick={this.handlePointClick} className="list-item section-point clickable" data-target={"section-pt_" + det.num}>Handbook Point {det.num}</li>
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
                        <button className="btn btn-danger">Delete Selected Point</button>
                    </div>
                    <h2>Version History</h2>
                </React.Fragment>}
                {this.state.data?.map((val) => {
                    return (
                        val.points?.map((pt) => {
                            return (
                                this.state.section === val.num && this.state.point === pt.num &&
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
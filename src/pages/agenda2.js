import React, {  useEffect, useState } from "react";
import Collapsible from "react-collapsible";

import { getSenateMeetingAllAPI,  getSenatePointsMeetingIdAPI, addSenateMeetingAPI, addSenatePointAPI } from '../api/senateMeeting'
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";



const Agenda = () => {
    const [data, setdata] = useState();
    const [agenda, setagenda] = useState(0);
    const [point, setpoint] = useState(0);
    const [pointData, setpointData] = useState();
    const [NewPoint, setNewPoint] = useState(false);
    const [number, setnumber] = useState();
    const [name, setname] = useState();
    
    const [proposal, setproposal] = useState();
    const [newpointCreated, setnewpointCreated] = useState(false);






    const handleAgendaClick = (e) => {
        setagenda(Number(e.target.dataset.target.split("_").slice(-1)));
        setpoint(0);
    }


    const handleNewPoint = async () => {
        await addSenatePointAPI(number, name, proposal, agenda);
        setnewpointCreated(true);
        getdata();
        setNewPoint(false)
        

    }


    const getdata = async () => {
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
                    name: points.name,
                    proposal : points.proposal,
                    resolution : points.resolution,
                    has_subpoints: false
                })
            }

            new_data.push({
                num: Meeting[i].number,
                name: Meeting[i].announcement,
                points: pointsArray

            })
        };

        console.log(new_data);
        setdata(new_data)

    }

    useEffect(() => {
        getdata();
    }, [])

    return (
        <>


            <Snackbar open={newpointCreated} autoHideDuration={6000} onClose={() => { setnewpointCreated(false); }}>
                <Alert onClose={() => { setnewpointCreated(false); }} severity="success" sx={{ width: '100%' }}>
                    New Point Created!
                </Alert>
            </Snackbar>


            <div className="agenda-cont">
                <div className="col-sm-3 agenda-menu left-pane">
                    <button className="btn mb-3" data-target="create-agenda">Create New Agenda</button>
                    <h2>Agendas</h2>
                    <ul className="list-group">
                        {
                            data?.map((val) => {
                                return <li data-active={agenda === val.num} onClick={handleAgendaClick} className="list-item agenda clickable" data-target={"agenda_" + val.num}>{val.name}</li>
                            })
                        }
                    </ul>
                </div>



                <div className="col-sm-3 agenda-submenu center-pane">
                    {agenda !== 0 && <React.Fragment>
                        {/* <DropdownButton onSelect={(e) => console.log(e)} as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
                        <Dropdown.Item eventKey="1">Delete Selected Agenda</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Finalise Agenda for Senate</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Rename Selected Agenda</Dropdown.Item>
                    </DropdownButton> */}

                        <button className="btn btn-primary mb-3" data-target="create-agenda" onClick={() => { setNewPoint(true) }}>New Agenda Point</button>
                        <div className="btn-group">
                            <button className="btn btn-danger mb-3" data-target="create-agenda" >Delete Agenda</button>
                            <button className="btn btn-success mb-3" data-target="create-agenda" >Finalise Agenda</button>
                        </div>
                        <h2>Agenda Points</h2></React.Fragment>}
                    {data?.map((val, id) => {
                        return (
                            agenda === val.num &&
                            <ul id={"agenda_" + id} className="list-group">
                                {val.points.map((det, id) => {
                                    return (
                                        det.has_subpoints ?
                                            (<Collapsible trigger={det.name}>
                                                {
                                                    det.subpoints.map((sp) => {
                                                        return (
                                                            <li data-active={point === det.num} onClick={this.handlePointClick} className="list-item agenda-point clickable" data-target={"agenda-pt_" + sp.num}>Handbook Sub Point {sp.num}</li>
                                                        )
                                                    })
                                                }
                                            </Collapsible>)

                                            : <li data-active={point === det.num} onClick={(e) => {
                                                setpoint(Number(e.target.dataset.target.split("_").slice(-1)))
                                                setpointData(det);
                                                console.log("agenda, point", agenda, point)
                                                console.log("data",det)
                                            }} className="list-item agenda-point clickable" data-target={"agenda-pt_" + det.num}>{det.name}</li>

                                    )
                                })}

                            </ul>
                        )
                    })
                    }

                </div>




                <div className="col-sm-6 changes-data pt-5">
                    {
                        NewPoint && (
                            <div>

                                <label for="ag_pt_new_prop" class="form-label">Proposal</label>
                                <input type="number" class="form-control" id="ag_pt_new_prop" placeholder="Enter point number" onChange={(e) => { setnumber(e.target.value) }}></input>
                                <input type="text" class="form-control" id="ag_pt_new_prop" placeholder="Enter point Name" onChange={(e) => { setname(e.target.value) }}></input>
                                
                                <textarea type="text" class="form-control" id="ag_pt_new_prop" placeholder="Proposal for the Agenda Point" onChange={(e) => { setproposal(e.target.value) }}></textarea>

                                <div>
                                    <button className="btn btn-success" onClick={handleNewPoint} >Create</button>
                                    <button className="btn btn-danger" onClick={() => { setNewPoint(false) }}>Cancel</button>
                                </div>
                            </div>
                        )
                    }

                    {
                      !NewPoint &&  (point === 0 ? (agenda === 0 ?
                            <h5 className="placeholder-tile">Select agenda and point first to view/edit</h5>
                            : (
                                <h5 className="placeholder-tile">Select point first to view/edit</h5>
                            )
                        ) : (<div>

                            <form className="ag_pt_view">
                                <label for="ag_pt_view_prop" class="form-label">Proposal</label>
                                <input readOnly={true} type="text" class="form-control" id="ag_pt_view_prop" placeholder={pointData.name} ></input>
                                <input readOnly={true} type="text" class="form-control" id="ag_pt_view_prop" placeholder={pointData.proposal}></input>
                                <button className="btn btn-danger">Delete Point</button>

                            </form>


                        </div>))

                    }



                </div>







            </div>
        </>
    )


}

export default Agenda;
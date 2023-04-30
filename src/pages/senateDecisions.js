import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";

import { getSenateMeetingAllAPI, getSenatePointsMeetingIdAPI, putSenatePointAPI} from '../api/senateMeeting'
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';



const SenateDecisions = () => {
    const [data, setdata] = useState();
    const [agenda, setagenda] = useState(0);
    const [point, setpoint] = useState(0);
    const [pointData, setpointData] = useState();
    const [resolution, setResolution] = useState();
    const [Decision, setDecision] = useState();

    const [emptyDecision, setemptyDecision] = useState(false);
    const [emptyResolution, setemptyResolution] = useState(false);
    const [DecisionDone, setDecisionDone] = useState(false);






    const handleAgendaClick = (e) => {
        setagenda(Number(e.target.dataset.target.split("_").slice(-1)));
        setpoint(0);
    }

    const handleSubmit= async(e) => {
        e.preventDefault();
        console.log(resolution, Decision);
        console.log(pointData)
         !resolution ? setemptyResolution(true) : (!Decision ?  setemptyDecision(true) : await putSenatePointAPI(pointData.id, pointData.num, pointData.senateMeeting, resolution, Decision))
        if(resolution && Decision)
        {
            setDecisionDone(true)
            setpoint(0);
            getdata();
        }









    }


    const getdata = async () => {
        const response = await getSenateMeetingAllAPI();
        const Meeting = response.body.results;
        const new_data = []



        for (let i = 0; i < Meeting.length; i++) {
            const pointsArray = []
            const res2 = await getSenatePointsMeetingIdAPI(Meeting[i].number)
            for (const points of res2.body.senatePoints) {

                pointsArray.push({
                    id: points.id,
                    num: points.number,
                    name: points.name,
                    senateMeeting : points.senateMeeting,
                    proposal: points.proposal,
                    resolution: points.resolution,
                    approvalComplete : points.approvalComplete,
                    approved : points.approved
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


            <Snackbar open={emptyDecision} autoHideDuration={3000} onClose={() => { setemptyDecision(false); }}>
                <Alert onClose={() => { setemptyDecision(false); }} severity="error" sx={{ width: '100%' }}>
                    Please Select Decision!
                </Alert>
            </Snackbar>

            <Snackbar open={emptyResolution} autoHideDuration={3000} onClose={() => { setemptyResolution(false); }}>
                <Alert onClose={() => { setemptyResolution(false); }} severity="error" sx={{ width: '100%' }}>
                    Please Write Resolution!
                </Alert>
            </Snackbar>

            <Snackbar open={DecisionDone} autoHideDuration={3000} onClose={() => { setDecisionDone(false); }}>
                <Alert onClose={() => { setDecisionDone(false); }} severity="success" sx={{ width: '100%' }}>
                    Senate Decision successfully Added!
                </Alert>
            </Snackbar>


            <div className="agenda-cont">
                <div className="col-sm-3 agenda-menu left-pane">
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

                        <h2>Agenda Points</h2></React.Fragment>}
                    {data?.map((val, id) => {
                        return (
                            agenda === val.num &&
                            <ul id={"agenda_" + id} className="list-group">
                                {val.points.map((det, id) => {
                                    return (
                                        det.has_subpoints ?
                                            (<Collapsible trigger={det.proposal}>
                                                {
                                                    det.subpoints.map((sp) => {
                                                        return (
                                                            <li data-active={point === sp.id} onClick={this.handlePointClick} className="list-item agenda-point clickable" data-target={"agenda-pt_" + sp.id}>Handbook Sub Point {sp.num}</li>
                                                        )
                                                    })
                                                }
                                            </Collapsible>)

                                            : <li data-active={point === det.id} onClick={(e) => {
                                                setpoint(Number(e.target.dataset.target.split("_").slice(-1)))
                                                setpointData(det);
                                                setResolution(det.resolution)
                                                setDecision(1)
                                                

                                                console.log("agenda, point", agenda, point)
                                                console.log("data", det)
                                            }} className="list-item agenda-point clickable" data-target={"agenda-pt_" + det.id}>{det.proposal}</li>

                                    )
                                })}

                            </ul>
                        )
                    })
                    }

                </div>




                <div className="col-sm-6 changes-data pt-5">

                    {
                        (point === 0 ? (agenda === 0 ?
                            <h5 className="placeholder-tile">Select agenda and point first to take a decision on it</h5>
                            : (
                                <h5 className="placeholder-tile">Select point first to take a decision on it</h5>
                            )
                        ) : (<div>


                            <form className="sen_dec_form">
                                <label for="sen_dec_prop" class="form-label">Proposal</label>
                                <textarea readOnly={true} type="text" class="form-control" id="sen_dec_prop" placeholder={pointData.proposal}></textarea>


                                {/* <TextField
                                    disabled
                                    id="outlined-disabled"
                                    label="Proposal"
                                    defaultValue={pointData.proposal}
                                />

                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Resolution"
                                    defaultValue={pointData.resolution}
                                    onChange={(e) => { setResolution(e.target.value) }}
                                /> */}
                                {/* <textarea placeholder="Comments"></textarea> */}
                                <div>
                                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                                        <InputLabel id="demo-simple-select-label">Decision</InputLabel>
                                        <Select
                                        defaultValue={pointData.approved + 1}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Decision"
                                            onChange={(e) => { setDecision(e.target.value) }}
                                        >
                                            <MenuItem value={1}>Approved</MenuItem>
                                            <MenuItem value={2}>Not Approved</MenuItem>
                                            <MenuItem value={3}>Rectified</MenuItem>
                                            <MenuItem value={4}>Noted</MenuItem>

                                        </Select>
                                    </FormControl>
                                </div>

                                <label for="sen_dec_res" class="form-label">Resolution</label>
                                <textarea type="text" class="form-control" id="sen_dec_res" defaultValue = {pointData.resolution} onChange={(e) => { setResolution(e.target.value) }}></textarea>


                                

                                <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
                            </form>

                            

                        </div>))

                    }



                </div>







            </div>
        </>
    )


}

export default SenateDecisions;
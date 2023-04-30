import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";

import { getSenateMeetingAllAPI, getSenatePointsMeetingIdAPI, addSenateMeetingAPI, addSenatePointAPI } from '../api/senateMeeting'
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Placeholder from 'react-bootstrap/Placeholder';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';




const Agenda = () => {
    const [data, setdata] = useState();
    const [agenda, setagenda] = useState(0);
    const [point, setpoint] = useState(0);
    const [pointData, setpointData] = useState();
    const [NewPoint, setNewPoint] = useState(false);
    const [number, setnumber] = useState();
    const [name, setname] = useState();
    const [meetingNumber, setmeetingNumber] = useState();
    const [proposal, setproposal] = useState();
    const [newpointCreated, setnewpointCreated] = useState(false);
    const [emptyMeetingNumber, setemptyMeetingNumber] = useState(false);
    const [meetingCreated, setmeetingCreated] = useState(false);
    const [openModal, setopenModal] = useState(false);
    const [loadingL, setLoadingL] = useState(true);
    const [emptyAnnoucement, setemptyAnnoucement] =useState(false)
    const [announcement, setannouncement] = useState()

    const handleModalClose = () => setopenModal(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    const handleMeetingSubmit = async () => {
        console.log("heree")
        console.log("meetingNumber", meetingNumber)
        if (meetingNumber && announcement)
        {
            await addSenateMeetingAPI(meetingNumber, announcement)
            setmeetingCreated(true);
            handleModalClose()
            getdata();
        }
        else if(!meetingNumber){
            setemptyMeetingNumber(true);
        }
        else{
            setemptyAnnoucement(true);
        }

    }




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
        setLoadingL(true);
        const response = await getSenateMeetingAllAPI();
        const Meeting = response.body.results;
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
                    id: points.id,
                    proposal: points.proposal,
                    resolution: points.resolution,
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
        setLoadingL(false)
        console.log(new_data);

    }

    useEffect(() => {
        getdata();
    }, [])

    return (
        <>


            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <FormControl fullWidth sx={{ margin: 1 }}>

                        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            label="Senate Meeting Number"
                            id="outlined-basic" variant="outlined"
                            onChange={(e) => setmeetingNumber(e.target.value)}
                        />


                    </FormControl>

                    <FormControl fullWidth sx={{ margin: 1 }}>

                        <TextField
                            label="Senate Meeting Name"
                            id="outlined-basic" variant="outlined"
                            onChange={(e) => setannouncement(e.target.value)}
                        />


                    </FormControl>




                    <Button variant="outlined" onClick={handleMeetingSubmit}>Submit</Button>
                    <Button variant="outlined" onClick={handleModalClose}>Close</Button>

                </Box>
            </Modal>


            <Snackbar open={emptyMeetingNumber} autoHideDuration={6000} onClose={() => { setemptyMeetingNumber(false); }}>
                <Alert onClose={() => { setemptyMeetingNumber(false); }} severity="error" sx={{ width: '100%' }}>
                    Meeting Number empty!
                </Alert>
            </Snackbar>
            <Snackbar open={emptyAnnoucement} autoHideDuration={6000} onClose={() => { setemptyAnnoucement(false); }}>
                <Alert onClose={() => { setemptyAnnoucement(false); }} severity="error" sx={{ width: '100%' }}>
                    Meeting Name empty!
                </Alert>
            </Snackbar>

            <Snackbar open={newpointCreated} autoHideDuration={6000} onClose={() => { setnewpointCreated(false); }}>
                <Alert onClose={() => { setnewpointCreated(false); }} severity="success" sx={{ width: '100%' }}>
                    New Point Created!
                </Alert>
            </Snackbar>



            <Snackbar open={meetingCreated} autoHideDuration={6000} onClose={() => { setmeetingCreated(false); }}>
                <Alert onClose={() => { setmeetingCreated(false); }} severity="success" sx={{ width: '100%' }}>
                    New Senate Agenda Created!
                </Alert>
            </Snackbar>


            <div className="agenda-cont">
                <div className="col-sm-3 agenda-menu left-pane">
                    <button className="btn btn-primary mb-3" data-target="create-agenda" onClick={() => setopenModal(true)}>Create New Agenda</button>
                    <h2>Agendas</h2>
                    <ul className="list-group">
                        {
                            !loadingL ? data?.map((val) => {
                                return <li data-active={agenda === val.num} onClick={handleAgendaClick} className="list-item agenda clickable" data-target={"agenda_" + val.num}>{val.name}</li>
                            }) :
                            <>
                                <Placeholder as="p" animation="glow">
                                    <Placeholder xs={12} />
                                </Placeholder>
                                <Placeholder as="p" animation="wave">
                                    <Placeholder xs={12} />
                                </Placeholder>
                            </>
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
                        <button className="btn btn-danger mb-3" data-target="create-agenda" >Delete Agenda</button>

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




                <div className="col-sm-6 right-pane changes-data">
                    {
                        NewPoint && (
                            <div className="ag_pt_new">

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
                        !NewPoint && (point === 0 ? (agenda === 0 ?
                            <h5 className="placeholder-tile">Select agenda and point first to view/edit</h5>
                            : (
                                <h5 className="placeholder-tile">Select point first to view/edit</h5>
                            )
                        ) : (<div>

                            <form className="ag_pt_view">
                                <label for="ag_pt_view_prop" class="form-label">Proposal</label>
                                <input readOnly={true} type="text" class="form-control" id="ag_pt_view_prop" placeholder={pointData.name} ></input>
                                <input readOnly={true} type="text" class="form-control" id="ag_pt_view_prop" placeholder={pointData.proposal}></input>
                                <div>
                                    <button className="btn btn-danger">Delete Point</button>
                                </div>

                            </form>


                        </div>))

                    }



                </div>







            </div>

            {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header CloseButton>
                    <Modal.Title>Crate Agenda</Modal.Title>
                {/* <CloseButton/> */}
                {/* </Modal.Header>
                <Modal.Body>
                    <form>
                        <label for="cr_ag_name" class="form-label">Agenda Name</label>
                        <input type="text" class="form-control" id="cr_ag_name" placeholder="Enter the Agenda Name"></input>

                        <label for="cr_ag_ann" class="form-label">Announcement</label>
                        <input type="textarea" active="false" class="form-control" id="cr_ag_ann" placeholder="Enter the Announcement"></input>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Create
                </Button>
                </Modal.Footer> */}
            {/* </Modal> */} 
        </>
    )


}

export default Agenda;